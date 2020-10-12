// Frontend JS 127.0.0.1:5500

const trytesToAscii = (trytes) => {
    const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};
// Import modified @iota/converter methods

document.addEventListener('DOMContentLoaded', onDomLoad, false);
// Before imgs load, run the function onDomLoad

function onDomLoad() {
    document.querySelector('button').addEventListener('click', onclick, false)
    // TODO. Listener to tag 'button' => function onclick()

    function onclick (){     
        const address = document.getElementById('address').value;
        const hash = document.getElementById('hash').value;
        const tag = document.getElementById('tag').value;

        var data = JSON.stringify({
            "address": `${address}`,
            //"hash": `${hash}`,
            "tag": `${tag}`
            });
        // Specify data structure
        console.log(data)
        var xhr = new XMLHttpRequest();
        // Init http request object
        xhr.withCredentials = true;
        // Enable cross-side comm

        xhr.open("POST", "http://localhost:5500");
        // Specify CRUD verb and LOCALPORT

        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        // Set http headers

        xhr.onreadystatechange = function() {
        // Init Callback Listener 
                let output = document.querySelector('textarea');
                // TODO. Another method to get to textarea

                output.innerHTML = xhr.responseText;
                //output.innerHTML = trytesToAscii(xhr.responseText);
                // Convert callback response to Ascii from trytes
        };

        xhr.send(data);
        // Send http request storaged in xhr
    }
}
