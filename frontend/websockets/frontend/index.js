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
let register = document.getElementById('register');
let login = document.getElementById('login');
let regName = document.getElementById('regName');
let regPassword = document.getElementById('regPassword');
let regEmail = document.getElementById('regEmail');
let logName = document.getElementById('logName');
let logPassword = document.getElementById('logPassword');


register.addEventListener('click', () => {
    socket.emit('register', {
        'name': regName.value,
        'password': regPassword.value,
        'email': regEmail.value
    })
})

login.addEventListener('click', () => {
    socket.emit('login', {
        'name': logName.value,
        'password': logPassword.value,
    })
})


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


