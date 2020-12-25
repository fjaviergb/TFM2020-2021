// Gracias a socket.io importando en el html. io() se conecta al dominio de este 
// en este caso, localhost:5500

// socket es todo el codigo del frontend que es capaz de enviar mensajes
var socket = io()

var pageContainer = document.getElementById('pageContainer');

socket.on('page', (_data) => {
    pageContainer.innerHTML = _data.front;

    if (_data.page='frontPage') {
        // DOM elements
        let register = document.getElementById('register');
        let login = document.getElementById('login');
        let optionsContainer = document.getElementById('optionsContainer');

        register.addEventListener('click', () => {
            console.log('Registering...')
            socket.emit('register', '')
        })

        login.addEventListener('click', () => {
            console.log('Loging...')
            socket.emit('login', '')

        })

        socket.on('optionsContainer', (data) => {
            optionsContainer.innerHTML=data.front

            if (data.front = 'FrontPage') {
                const frontPageSubmit = document.getElementById(`${data.back}`);
                const frontPageStatus = document.getElementById(`${data.status}`);

                frontPageSubmit.addEventListener('click', () => {
                    let list = data._data
                    let res = []
                    list.map((obj) => {
                        res[list.indexOf(obj)] = document.getElementById(obj).value
                    })
                    console.log('Submiting...')
                    socket.emit(`${data.back}`, res)

                    socket.on(`${data.status}`, (data) => {
                        frontPageStatus.innerHTML = data;
                    })
                });
            }
        });

    } else if (_data.page = 'backPage') {
        console.log('Cambiando')
    }
});