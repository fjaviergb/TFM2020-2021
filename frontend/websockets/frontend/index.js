// Gracias a socket.io importando en el html. io() se conecta al dominio de este momento
// en este caso, localhost:5500
// socket es todo el codigo del frontend que es capaz de enviar mensajes
const socket = io()

// DOM elements
let address = document.getElementById('addresses');
let addressbox = document.getElementById('addressesbox');
let tag = document.getElementById('tags');
let tagbox = document.getElementById('tagsbox');
let submit = document.getElementById('submit');
let output = document.getElementById('output_container');

submit.addEventListener('click', () => {
    socket.emit('trytes', {
        'add': address.value,
        'tg': tag.value
    })
})

socket.on('res', (data) => {
    output.innerHTML += `<p>${data}</p>`;
    console.log('Receiving data')
})


