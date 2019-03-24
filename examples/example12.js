
class App {
    constructor() {
        this.xor = new LibXOR("project");

        let p = document.getElementById('desc');
        p.innerHTML = `This app demonstrates the use of a keyboard of gamepad for controlling game input. The Arrow keys or WASD controls direction and SPACE/CONTROL/ENTER/ESCAPE are the buttons.`;

        let c = document.getElementById('controls');
        c.appendChild(createRow('iSkyMode', '<input id="iSkyMode" type="range" min="0", max="5", value="1" />'));
        createRangeRow(c, 'iTurbidity', 1, 1, 10, 1);
        createRangeRow(c, 'iAlbedo', 0, 0, 10, 1, true);
        createRangeRow(c, 'fSigma2', 0.0, 0.0, 1.0, 0.05);
        createRangeRow(c, 'fSunInclination', 90, 0, 180, 1);
        createRangeRow(c, 'fSunAzimuth', 0, -360, 360, 1);

        this.leftright = 0.0;
        this.updown = 0.0;
        this.anybutton = 0.0;
        this.b0 = 0.0;
        this.b1 = 0.0;
        this.b2 = 0.0;
        this.b3 = 0.0;

        this.player = new PhysicsObject();
        this.constants = new PhysicsConstants();
    }

    init() {
        hflog.logElement = "log";
        this.xor.graphics.setVideoMode(1.5 * 384, 384);
        this.xor.input.init();
        this.xor.graphics.gl;

        let rc = this.xor.renderconfigs.load('default', 'basic.vert', 'basic.frag');
        rc.useDepthTest = true;

        let pal = this.xor.palette;
        this.xor.meshes.load('rect', 'rect.obj');
        let bg = this.xor.meshes.create('bg');
        bg.color3(pal.getColor(pal.BROWN));
        bg.rect(-5, -1, 5, -5);
        bg.color3(pal.getColor(pal.YELLOW));
        bg.circle(2, 1.5, 0.25);
    }

    start() {
        this.mainloop();
    }

    update(dt) {
        let xor = this.xor;
        xor.input.poll();
        let resetSim = false;
        if (xor.input.checkKeys([" ", "Space"])) {
            resetSim = true;
        }

        this.leftright = 0.0;
        this.updown = 0.0;
        this.anybutton = 0.0;

        // From XBOX ONE / PS4 Controller
        // B0 -> A X        ENTER / JUMP   "SPACE"
        // B1 -> B CIRCLE   CANCEL/ BACK   "ESCAPE"
        // B2 -> X SQUARE   SHIFT / RUN    "CONTROL"
        // B3 -> Y TRIANGLE MENU  / ACTION "ENTER"
        let b0Keys = ["Space"];
        let b1Keys = ["Escape", "Esc"];
        let b2Keys = ["Control", "ControlLeft", "ControlRight"];
        let b3Keys = ["Enter"];
        let dirLKeys = ["ArrowLeft", "Left", "A", "a"];
        let dirRKeys = ["ArrowRight", "Right", "D", "d"];
        let dirUKeys = ["ArrowUp", "Up", "W", "w"];
        let dirDKeys = ["ArrowDown", "Down", "S", "s"];
        this.b0 = xor.input.checkKeys(b0Keys) ? 1.0 : 0.0;
        this.b1 = xor.input.checkKeys(b1Keys) ? 1.0 : 0.0;
        this.b2 = xor.input.checkKeys(b2Keys) ? 1.0 : 0.0;
        this.b3 = xor.input.checkKeys(b3Keys) ? 1.0 : 0.0;
        if (xor.input.checkKeys(dirLKeys)) {
            this.leftright -= 1.0;
        }
        if (xor.input.checkKeys(dirRKeys)) {
            this.leftright += 1.0;
        }
        if (xor.input.checkKeys(dirUKeys)) {
            this.updown += 1.0;
        }
        if (xor.input.checkKeys(dirDKeys)) {
            this.updown -= 1.0;
        }
        this.anybutton = (this.b0 + this.b1 + this.b2 + this.b3) > 0.0;

        for (let i = 0; i < 4; i++) {
            let gp = xor.input.gamepads.get(i);
            if (!gp.enabled) {
                continue;
            }
            this.updown = gp.updown;
            this.leftright = gp.leftright;
            this.anybutton = (gp.b0 + gp.b1 + gp.b2 + gp.b3) > 0.0 ? 1.0 : 0.0;
        }

        if (resetSim) {
            this.player.x = GTE.vec3();
        }

        this.player.accelerations = [
            GTE.vec3(0.0, -this.updown * this.constants.g * 2, 0.0),
            GTE.vec3(this.leftright * 10.0, 0.0, 0.0),
        ];
        this.player.update(dt, this.constants);
        this.player.bound(-2.0, 2.0, -1.0, 2.0);
    }

    render() {
        let xor = this.xor;
        xor.graphics.clear(xor.palette.AZURE);

        let pmatrix = Matrix4.makePerspectiveY(45.0, 1.5, 1.0, 100.0);
        let cmatrix = Matrix4.makeOrbit(-90, 0, 5.0);
        let rc = xor.renderconfigs.use('default');
        if (rc) {
            rc.uniformMatrix4f('ProjectionMatrix', pmatrix);
            rc.uniformMatrix4f('CameraMatrix', cmatrix);

            rc.uniformMatrix4f('WorldMatrix', Matrix4.makeIdentity());
            xor.meshes.render('bg', rc);

            rc.uniformMatrix4f('WorldMatrix', Matrix4.makeTranslation3(this.player.x));
            xor.meshes.render('rect', rc);
        }
        xor.renderconfigs.use(null);
    }

    mainloop() {
        let self = this;
        window.requestAnimationFrame((t) => {
            self.xor.startFrame(t);
            self.update(self.xor.dt);
            self.render();
            self.mainloop();
        });
    }
}

let app = new App();
app.init();
app.start();
