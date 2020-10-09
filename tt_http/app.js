const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var data = JSON.stringify({
    "name": "new course"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "https://www.google.es/");
    xhr.send(data);


