document.addEventListener('DOMContentLoaded', onDomLoad, false);

function onDomLoad() {
    console.log('Prueba1')
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick (){     
        console.log('Prueba2');
        const address = document.querySelector('input').value;

        var data = JSON.stringify({
            "address": `${address}`
            });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.open("POST", "http://localhost:5500");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);

    }

    function onload(res) {
        console.log('Prueba3')
        let area = document.querySelector('textarea')
        area.innerHTML = data;
    }
}

// 08/10/2020. Duración: 3 horas