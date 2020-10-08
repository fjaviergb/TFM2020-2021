const http = require('http');

const server = http.createServer();
server.listen(3000);

server.on('request', (req, res) => {
    console.log(req);
    res = 'recibido'
});

console.log('Listening to port 3000...')


