// Gracias a socket.io importando en el html. io() se conecta al dominio de este 
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
let forReg = document.getElementById('forReg');
let forLog = document.getElementById('forLog');

register.addEventListener('click', () => {
    socket.emit('register', {
        'name': regName.value,
        'password': regPassword.value,
        'email': regEmail.value
    })
})

var logged = true;
login.addEventListener('click', () => {
    switch (logged) {
        case true:
            socket.emit('login', {
                'name': logName.value,
                'password': logPassword.value,
            })
            login.innerHTML = 'LogOut';
            logged = false;
            break;
        case false:
            socket.emit('login', {
                'name': logName.value,
                'password': logPassword.value,
            })
            login.innerHTML = 'Login';
            logged = true;
            break;
    };
});

socket.on('res', (data) => {
    output.innerHTML += `<p>${data}</p>`;
    console.log('Receiving data')
})

socket.on('registerRes', (data) => {
    forReg.innerHTML = data;
    console.log('Receiving data')
})

socket.on('loginResStatus', (data) => {
    forLog.innerHTML = data;
    console.log(data)
})

socket.on('loginResSucc', (data) => {
    if (logged = true){
        submit.addEventListener('click', () => {
            socket.emit('trytes', {
                'idcl': data,
                'add': address.value,
                'tg': tag.value,
                'status': logged
            })
        });
    };
});
