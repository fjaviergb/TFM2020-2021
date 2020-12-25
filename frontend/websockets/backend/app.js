// ##################################
// __INIT__
// ##################################
// express maneja el servidor
const express = require('express');
const SocketIO = require('socket.io');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PutosRusosSQL13186",
    database: "iota_tx_reader2",
  });

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "PutosRusosSQL13186",
  database: "iota_tx_reader2",
});

// ##################################
// SERVER
// ##################################
// App contiene conf del servidor
const app = express();

// Escucha puerto; process.env.PORT tomará el puerto especificado en esa variable; si no, toma el ||
app.set('port', process.env.PORT || 5500);

// static files - manda un módulo al navegador que no va a modificarse (el código html)
app.use(express.static('C:\\Master\\TFM\\code\\TFM2020-2021\\frontend\\websockets\\frontend'));

//Escucha al puerto especificado en app.set
const _server = app.listen(app.get('port'), () => {
    console.log('Starting server on...', app.get('port'));
});

// ##################################
// WEBSOCKETS
// ##################################

// SocketIO necesita un servidor, que es asignado con el listen() y el _server con alguna configuración
// esta conexion se guarda en la constante io; que entonces permite al server utilizar los websockets
const io = SocketIO(_server);

io.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id);

    socket.on('register', () => {
        io.to(socket.id).emit('optionsContainer', {
            'front':
            '<div id=\'registerContainer\'>'+
            '<input type=\'text\' id=\'regName\'>Name</input>'+
            '<br>'+
            '<input type=\'text\' id=\'regPassword\'>Password</input>'+
            '<br>'+
            '<input type=\'text\' id=\'regEmail\'>Email</input>'+
            '<br>'+
            '<button id=\'registerSubmit\' type=\'submit\'>Submit</button>'+
            '</div>',
            'back': 'registerSubmit',
            '_data': ['regName','regPassword','regEmail']
        })
    });

    socket.on('login', () =>{
        io.to(socket.id).emit('optionsContainer',{
            'front':
            '<div id=\'loginContainer\'>'+
            '<input type=\'text\' id=\'logName\'>Name</input>'+
            '<br>'+
            '<input type=\'text\' id=\'logPassword\'>Password</input>'+
            '<br>'+
            '<button id=\'loginSubmit\' type=\'submit\'>Submit</button>'+
            '</div>',
            'back': `loginSubmit`,
            '_data': ['logName','logPassword']
        })
    });

    socket.on('registerSubmit', (data) => {
        console.log(data)
    });

    socket.on('loginSubmit', (data) => {
        console.log(data)
    });

});