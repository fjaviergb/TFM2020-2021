// ##################################
// __INIT__
// ##################################
// express maneja el servidor
const express = require('express');
const SocketIO = require('socket.io');

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
})




// ##################################
// WEBSOCKETS
// ##################################

// SocketIO necesita un servidor, que es asignado con el listen() y el _server con alguna configuración
// esta conexion se guarda en la constante io; que entonces permite al server utilizar los websockets
const io = SocketIO(_server);
// on = listener. Cuando se recibe un mensaje 'connection', se ejecuta la funcion
io.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id);
    socket.on('trytes', (data) => {
        console.log(data);
    })
});







