// ##################################
// __INIT__
// ##################################
// express maneja el servidor
const express = require('express');
const SocketIO = require('socket.io');
const mysql = require('mysql');
const redis = require('redis');

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

con.connect( (err) => {
  if (err) throw err;
  console.log("Connected!");
});

async function _query(sql,socket){
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(elem => {io.to(socket.id).emit('res',elem.name);})
    console.log("Result: " + result);
  });
};


// on = listener. Cuando se recibe un mensaje 'connection', se ejecuta la funcion
io.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id);

  // REGISTER
  socket.on('register', (data) => {
    console.log('On registering...')
    var data = {
      'name':data.name,
      'contact':data.email,
    };
    let sql = 'INSERT INTO users SET ?' 
    pool.query(sql, data, (err, result) => {
      if (err) {
        io.to(socket.id).emit('registerRes',`<p>Failed to register - Errno ${err.errno}</p>`);
      }
      else {io.to(socket.id).emit('registerRes','<p>Success</p>')};
    });
  }); 

  // LOGIN
  socket.on('login', (data) => {
    console.log('login' + data)
  });  

  socket.on('trytes', (data) => {
    let sql = `SELECT name FROM transactions WHERE transactions.tag = "${data.tg}"`
    _query(sql,socket)
  }); 
  
});







