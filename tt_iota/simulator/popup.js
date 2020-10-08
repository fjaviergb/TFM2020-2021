const url = 'localhost:3000';

document.addEventListener('DOMContentLoaded', onDomLoad, false);

function onDomLoad() {
    console.log('Prueba1')
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick (){     
        console.log('Prueba2')
        let address = document.querySelector('input').value;
        chrome.url.sendMessage(tabs[0].id, address, onload)
           
    }

    function onload(res) {
        console.log('Prueba3')
        let area = document.querySelector('textarea')
        area.innerHTML = data;
    }
}

// 08/10/2020. Duración: 3 horas