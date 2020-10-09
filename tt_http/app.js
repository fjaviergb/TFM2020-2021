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

    xhr.open("GET", "http://localhost:3000/api/courses");
    xhr.send(data);


