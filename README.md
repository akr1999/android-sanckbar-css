# Android-sanckbar-css

An android styled snackbar for web based application with responsive design.

## Features

* Responsive design
* Consists of four types: Info, Error, Warn, Success.
* Need to define only a variable and several call will make things happen!

## Getting Started

* These instructions will get you a copy of the project up and running on your local machine for development purposes. 

### Prerequisites

* Fetch the latest version of jquery or if you like download from this link:

```
https://code.jquery.com/jquery-3.4.1.js
```

* In head tag insert these two files

```
    <link rel="stylesheet" href="snack.css">
    <script src="js/jquery.js"></script>
```

* After body tag insert this file

```
<script src="snack.js"></script>
```

* Sample HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="snack.css">
    <script src="js/jquery.js"></script>
</head>
<body>
    
</body>
<script src="snack.js"></script>
</html>
```

* Path may change in your case (in my case all files are in main directory)

### How things work

* Creates new elements for html

```
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
```

* Class which creates a snackbar

```
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
```

## Testing

* To test open index.html and press the demo button

* To make your own snackbar do the following

```
//Make a variable declare it after class and make it global

var bar = new Snackbar()

//Set the type

bar.setType("error") // in place of "error" can put "info" or "warn" or "success"

//Show the bar 

bar.show("Demo snack message", 3000) 

// in place of "Demo snack message" put your own message 
// in place of 3000 put any value greater than 500 for good results in animation and readibility
// the value 3000 means 3000/1000 = 3 sec ( 1000 = 1 sec )

//Summary 

  $(document).ready(function () 
  {
    var bar = new Snackbar()
    document.body.appendChild(createElement("button", {"id": "demo"}, "demo"));
    var login_btn = document.querySelector('#demo');
    login_btn.addEventListener('click', function () {
      bar.setType("error")
      bar.showBar("hi", 2000) 
    });
  })

```

## Things to keep in mind

* when adding to a event in js file make sure to put following lines in your event and change accordingly

* For error 

```
bar.setType("error")
bar.showBar("[your error message]", 2000) 
```

* For info 

```
bar.setType("info")
bar.showBar("[your info message]", 2000) 
```

* For warn

```
bar.setType("warn")
bar.showBar("[your warn message]", 2000) 
```

* For success 

```
bar.setType("success")
bar.showBar("[your success message]", 2000) 
```
