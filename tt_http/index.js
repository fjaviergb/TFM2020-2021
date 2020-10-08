// Fetch API o XMLHttpRequest en JS Vanilla
// var xmlHttp = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', onDomLoad, false);

function onDomLoad() {
    console.log('Prueba1')
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick (){     
        console.log('Prueba2')
        fetch('https://localhost:3000')
        .then(response => response.json())
        .then(data => console.log(data));    
    }

}

