
function createElement(element, attribute, inner) {
    if (typeof (element) === "undefined") {
        return false;
    }
    if (typeof (inner) === "undefined") {
        inner = "";
    }
    var el = document.createElement(element);
    if (typeof (attribute) === 'object') {
        for (var key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }
    if (!Array.isArray(inner)) {
        inner = [inner];
    }
    for (var k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }
    return el;
}


class Snackbar {

    constructor() {
        var s_m = createElement("a", { "href": "javascript:void()", "id": "snackbar_message" }, "")
        var s_b = createElement("div", { "id": "snackbar", "class": "snackbar" }, [s_m]);
        document.body.appendChild(s_b);
        this.snackbar = document.getElementById("snackbar");
        this.snackbar_message = document.getElementById("snackbar_message");
        this.snackbar_position = -40
        this.hideId = 0
    }

    setType(typ) {
        this.snackbar_type = typ
        this.snackbar.className = 'snackbar'
    }

    hideBar(thi) {
        var id = setInterval(() => {
            if (thi.snackbar_position == -40) {
                clearInterval(id);
            }
            else {
                thi.snackbar_position--;
                thi.snackbar.style.bottom = thi.snackbar_position + 'px';
            }
        }, 2)
    }

    showBar(message, hideAfter) {

        this.snackbar_position = -40
        this.snackbar_message.innerHTML = message

        if (this.snackbar_type == "error") { this.snackbar.classList.add('red-clr'); }
        if (this.snackbar_type == "info") { this.snackbar.classList.add('blue-clr'); }
        if (this.snackbar_type == "warn") { this.snackbar.classList.add('yellow-clr'); }
        if (this.snackbar_type == "success") { this.snackbar.classList.add('yellow-clr'); }

        var id = setInterval(() => {
            if (this.snackbar_position == 0) {
                clearInterval(id);
                if (this.hideId != 0) clearTimeout(this.hideId)
                this.hideId = setTimeout(this.hideBar, hideAfter, this)
            }
            else {
                this.snackbar_position++;
                this.snackbar.style.bottom = this.snackbar_position + 'px';
            }
        }, 2)

    }
}
