/* eslint-disable no-unused-vars */
/// <reference path="../LibXOR.d.ts" />

// START HELPFUL HTML5 FUNCTIONS

/**
 * Creates a row div with a left and right column. It expects CSS class row, column, left, and right.
 * @param {string} leftContent 
 * @param {string} rightContent 
 */
function createRow(leftContent = "", rightContent = ""): HTMLDivElement {
    let row = document.createElement('div');
    row.className = 'row';
    let left = document.createElement('div');
    left.className = 'column left';
    left.innerHTML = leftContent;
    let right = document.createElement('div');
    right.className = 'column right';
    right.innerHTML = rightContent;
    row.appendChild(left);
    row.appendChild(right);
    return row;
}

/**
 * createRangeRow creates a row with a range control
 * @param {HTMLElement} parent The element that should be appended to
 * @param {string} id The name of the range variable
 * @param {number} curValue The current value of the range
 * @param {number} minValue The minimum value of the range
 * @param {number} maxValue The maximum value of the range
 * @param {number} stepValue The step of the range control (default 1)
 * @returns {HTMLElement} The created HTMLElement div
 */
function createRangeRow(
    parent: HTMLElement,
    id: string,
    curValue: number,
    minValue: number,
    maxValue: number,
    stepValue = 1,
    isvector = false) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column'>";
    if (!isvector) {
        rContent += "<input type='range' id='" + id + "' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "</div><div class='column left'>";
        rContent += "<label id='" + id + "_value'>0</label>";
    } else {
        rContent += "<input type='range' id='" + id + "1' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "<input type='range' id='" + id + "2' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "<input type='range' id='" + id + "3' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
    }
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}

/**
 * createRowButton adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} caption The caption of the button
 * @param {string} id The name of the button's id
 * @param {function} callback A callback function if this gets clicked
 */
function createButtonRow(
    parent: HTMLElement,
    id: string,
    caption: string,
    callback: () => void) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<button id='" + id + "'>" + caption + "</button>";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>0</label>"; rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
    let b = document.getElementById(id);
    if (b) {
        b.onclick = callback;
    }
}

/**
 * createCheckButton adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the button's id
 * @param {boolean} checked Is it checked or not
 */
function createCheckRow(parent: HTMLElement, id: string, checked: boolean) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    let c = checked ? " checked" : "";
    rContent += "<input type='checkbox' id='" + id + "' " + c + "/>";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>0</label>"; rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}

/**
 * createTextRow adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the button's id
 * @param {string} value The initial value of the string
 */
function createTextRow(parent: HTMLElement, id: string, value: string) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<input type='text' style='width: 8em' id='" + id + " value='" + value + "' />";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>" + value + "</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}

/**
 * createTextRow adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the label's id
 * @param {string} value The initial value of the string
 */
function createLabelRow(parent: HTMLElement, id: string, value: string) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<label id='" + id + "_value'>" + value + "</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}

/**
 * createDivRow adds a row to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the row's id
 */
function createDivRow(parent: HTMLElement, id: string) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right' id='" + id + "'>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}

/**
 * setDivRowContents
 * @param {string} id 
 * @param {string} content 
 */
function setDivRowContents(id: string, content: string) {
    let e = document.getElementById(id);
    if (!e) return;
    e.innerHTML = content;
}

function setDivRowButtonCaption(id: string, caption: string) {
    let e = <HTMLInputElement>document.getElementById(id);
    if (!e) return;
    e.innerHTML = caption;
}

/**
 * setDivRowValue
 * @param id the id of the input element
 * @param content the new value the control should have
 */
function setDivRowValue(id: string, content: string) {
    let e = <HTMLInputElement>document.getElementById(id);
    if (!e) return;
    e.value = content;
    let l = document.getElementById(id + "_value");
    if (l) l.innerHTML = e.value.toString();
}

/**
 * setDivLabelValue
 * @param id the id of the input element
 * @param content the new value the control should have
 */
function setDivLabelValue(id: string, content: string) {
    let l = document.getElementById(id + "_value");
    if (l) l.innerHTML = content;
}

/**
 * getRangeValue returns the number of a range control
 * @param {string} id 
 * @returns the value of the range control or 0
 */
function getRangeValue(id: string): number {
    let e = <HTMLInputElement>document.getElementById(id);
    if (!e) return 0;
    let l = document.getElementById(id + "_value");
    if (l) l.innerHTML = e.value.toString();
    return parseFloat(e.value) * 1.0;
}

/**
 * Returns if control is checked or not
 * @param {string} id 
 * @returns {boolean}
 */
function getCheckValue(id: string): boolean {
    let e = <HTMLInputElement>document.getElementById(id);
    if (!e) return false;
    let l = document.getElementById(id + "_value");
    if (l) l.innerHTML = e.value.toString();
    return e.checked;
}

/**
 * getRangeVector3
 * @param {string} id The id of the range controls ending with 1, 2, 3. Example: id="sky", we get "sky1", "sky2", etc.
 * @returns {Vector3} A Vector3 with the values from controls id1, id2, and id3.
 */
function getRangeVector3(id: string): Vector3 {
    return Vector3.make(
        getRangeValue(id + "1"),
        getRangeValue(id + "2"),
        getRangeValue(id + "3")
    );
}


/**
 * setIdToHtml
 * @param {string} id 
 * @param {string} html
 */
function setIdToHtml(id: string, html: string): void {
    let el = document.getElementById(id);
    if (el) {
        el.innerHTML = html;
    }
}

// END HELPFUL HTML5 CODE