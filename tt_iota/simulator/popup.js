document.addEventListener('DOMContentLoaded', onDomLoad, false);

const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const trytesToAscii = (trytes) => {
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};

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

        xhr.onreadystatechange = function() {
                let output = document.querySelector('textarea');
                output.innerHTML = trytesToAscii(xhr.responseText);
        };

        xhr.send(data);
    }
}

// 08/10/2020. Duración: 3 horas