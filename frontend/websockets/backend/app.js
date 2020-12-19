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
    io.to(socket.id).emit('res',result[0].tag);
    console.log("Result: " + result[0].tag);
  });
};


// on = listener. Cuando se recibe un mensaje 'connection', se ejecuta la funcion
io.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id);

  // REGISTER
  socket.on('register', (data) => {
    let sql = `CREATE USER '${data.name}'@'localhost' IDENTIFIED BY '${data.password}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
    });
    let sql2 = `GRANT ALL PRIVILEGES ON iota_tx_reader2.transactions TO '${data.name}'@'localhost'`;
    con.query(sql2, (err, result) => {
      if (err) throw err;
    });
    console.log("Registro satisfactorio");
  }); 

  // LOGIN
  socket.on('login', (data) => {
    console.log('login' + data)
  });  

  socket.on('trytes', (data) => {
    let sql = `SELECT * FROM transactions WHERE transactions.tag = "${data.tg}"`
    _query(sql,socket)
  }); 
  
});







