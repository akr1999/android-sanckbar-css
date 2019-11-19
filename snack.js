
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
        this.snackbar_position = -42
        this.hideId = 0
    }

    setType(typ) {
        this.snackbar_type = typ
        this.snackbar.className = 'snackbar'
    }

    hideBar(thi) {
        var id = setInterval(() => {
            if (thi.snackbar_position == -42) {
                Snackbar.canShow = true
                clearInterval(id);
            }
            else {
                thi.snackbar_position--;
                thi.snackbar.style.bottom = thi.snackbar_position + 'px';                
            }
        }, 2)
    }

    showBar(message, hideAfter) {
        Snackbar.canShow = false
        this.snackbar_position = -42
        this.snackbar_message.innerHTML = message

        if (this.snackbar_type == "error") { this.snackbar.classList.add('red-clr'); }
        if (this.snackbar_type == "info") { this.snackbar.classList.add('blue-clr'); }
        if (this.snackbar_type == "warn") { this.snackbar.classList.add('yellow-clr'); }
        if (this.snackbar_type == "success") { this.snackbar.classList.add('green-clr'); }

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

Snackbar.canShow = true

class SnackbarHelper extends Snackbar {


    constructor() {
        super()
        this.list = []
        this.render = setInterval(() => {
            if (this.list.length > 0 && Snackbar.canShow) {
                super.setType(this.list[0].typ)
                super.showBar(this.list[0].message, this.list[0].time)
                this.deleteFromList(this, this.list[0].message)
            }
        }, 50)
    }

    addToList(message, time, typ) {
        this.list.push({ message: message, time: time, typ: typ })
        //console.log(message + " added")
    }

    deleteFromList(sh, message) {
        var id = sh.list.find(function (value) { return (value.message.localeCompare(message) == 0) })
        if (id) {
            sh.list.splice(id, 1)
            //console.log(message + " deleted")
        }
    }

}

sh = new SnackbarHelper()

var num = [1, 2, 3, 4]
var chosen = 0

var id = setInterval(() => {
    var typ = ""
    if (chosen > 3) chosen = 0
    switch (chosen) {
        case 1:
            typ = "info"
            break;
        case 2:
            typ = "error"
            break;
        case 3:
            typ = "warn"
            break;
        default:
            typ = "success"
            break;
    }
    chosen++
    //console.log(typ, Math.floor(Math.random() * 100) + "", Math.floor(Math.random()*10)*1000)
    sh.addToList(Math.floor(Math.random() * 100) + "", Math.floor(Math.random()*10)*1000, typ)
}, 2)

setTimeout(function () {
    clearInterval(id)
},3000)










