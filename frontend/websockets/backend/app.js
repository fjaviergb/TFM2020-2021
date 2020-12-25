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
    io.to(socket.id).emit('page', {
        'front':
        '<div id=\'options\'>'+
        '<button id=\'register\' type=\'submit\'>Register</button>'+
        '<button id=\'login\' type=\'submit\'>Login</button>'+
        '</div>'+
        '<div id=\'optionsContainer\'></div>',
        'page': 'frontPage'
    });

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
            '</div>'+
            '<div id=\'registerStatus\'></div>',
            'back': 'registerSubmit',
            '_data': ['regName','regPassword','regEmail'],
            'status': 'registerStatus',
            'page':'FrontPage'
        });
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
            '</div>'+
            '<div id=\'loginStatus\'></div>',
            'back': `loginSubmit`,
            '_data': ['logName','logPassword'],
            'status': 'loginStatus',
            'page':'FrontPage'
        });
    });

    socket.on('registerSubmit', (data) => {
        var _data = {
            'name': data[0],
            //'password': data[1],
            //'created': new.Date(),
            'contact': data[2]
        };
        let sql = 'INSERT INTO users SET ?' 
        pool.query(sql, _data, (err, result) => {
          if (err) {
            io.to(socket.id).emit('registerStatus',`<p>Failed to register - Errno ${err.errno}</p>`);
          }
          else {
              io.to(socket.id).emit('registerStatus','<p>Successful!</p>')
              io.to(socket.id).emit('optionsContainer',{
                'front':'<div id=\'mainPage\'>HEMOS CAMBIADO</div>',
                'page': 'backPage',
                'user': _data,
                });
            };  
        });   
    });

    socket.on('loginSubmit', (data) => {
        var _data = {
            'name': data[0],
            'password': data[1],
        };
        let sql = `SELECT * FROM users WHERE users.name = "${_data.name}"`;
        pool.query(sql, _data, (err, result) => {
            if (err) {
                io.to(socket.id).emit('loginStatus',`<p>Failed to login - Errno ${err.errno}</p>`);
              }
              else {
                if (result.length > 0) {
                  io.to(socket.id).emit('loginStatus','<p>Successful!</p>');
                  io.to(socket.id).emit('backPage',{
                    'front':'<div id=\'mainPage\'>HEMOS CAMBIADO</div>',
                    'page': 'backPage',
                    'user': result,
                    });
                }
                else {io.to(socket.id).emit('loginStatus','<p>User Not found</p>')}
              };
        });
    }); 
});