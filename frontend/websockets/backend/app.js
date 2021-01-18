// ##################################
// __INIT__
// ##################################
// express maneja el servidor
const express = require('express');
const SocketIO = require('socket.io');
const mysql = require('mysql');
const NAME = require('./names.js');

var pool = mysql.createPool({
    connectionLimit: NAME.DATABASE.CONNECTIONLIMIT,
    host: NAME.DATABASE.HOST,
    user: NAME.DATABASE.USER,
    password: NAME.DATABASE.PASSWORD,
    database: NAME.DATABASE.DATABNAME,
});

class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this)
    }
    saveClient(username,socketId){
        this.clientList[username] = socketId;
    }
};
const clients = new Clients();

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
    
    // #########
    // CONEXIÓN
    // #########
    var idcl = 0;
    console.log('Nueva conexión', socket.id);
    io.to(socket.id).emit(NAME.FRONTPAGE.NAME, NAME.FRONTPAGE.HTML);

    // #########
    // FRONT-PAGE
    // #########
    socket.on('register', () => {
        io.to(socket.id).emit('optionsContainer', NAME.OPTIONSCONTAINER.HTML_REGISTER);
    });

    socket.on('login', () =>{
        io.to(socket.id).emit('optionsContainer', NAME.OPTIONSCONTAINER.HTML_LOGIN);
    });

    socket.on('registerSubmit', (data) => {
        var _data = {
            'name': data[0],
            //'password': data[1],
            'contact': data[2]
            //'created': new.Date(),
        };
        let sql = 'INSERT INTO users SET ?' 
        pool.query(sql, _data, (err, result) => {
          if (err) {
            io.to(socket.id).emit('registerStatus',`<p>Failed to register - Errno ${err.errno}</p>`);
          }
          else {
              clients.saveClient(data[0],socket.id)
              //TODO: password
              console.log(clients.clientList)
              io.to(socket.id).emit('registerStatus','<p>Successful!</p>')
              io.to(socket.id).emit('backPage',[NAME.BACKPAGE.HTML, result]);
                //idcl = result[0].idcl;
                // TODO: arreglar idcl en REGISTER
            };  
        });   
    });

    socket.on('loginSubmit', (data) => {
        var _data = {
            'name': data[0],
            'password': data[1],
        };
        // CAMBIAR DATA DE ENTRADA POR CORREO
        let sql = `SELECT * FROM users WHERE users.name = "${_data.name}"`;
        pool.query(sql, _data, (err, result) => {
            if (err) {
                io.to(socket.id).emit('loginStatus',`<p>Failed to login - Errno ${err.errno}</p>`);
              }
              else {
                if (result.length > 0) {
                  clients.saveClient(data[0],socket.id)
                  //TODO: password
                  console.log(clients.clientList)
                  io.to(socket.id).emit('loginStatus','<p>Successful!</p>');
                  io.to(socket.id).emit('backPage',[NAME.BACKPAGE.HTML,result]);
                    idcl = result[0].idcl;
                }
                else {io.to(socket.id).emit('loginStatus','<p>User Not found</p>')}
              };
        });
    }); 

    // #########
    // BACK-PAGE
    // #########
    socket.on('profile', (data) => {
        // TODO: buscar addresses y tags que tiene el usuario y displayearlas
        io.to(socket.id).emit('optionsContainerProfile', NAME.OPTIONSCONTAINERPROFILE.HTML);
    });

    socket.on('addressSubmit', (data) => {
        if (data.length === 90) {
            io.to(socket.id).emit('newAddress', NAME.OPTIONSCONTAINERPROFILE.NEWADDRESS(data))
        };
    });

    socket.on('tagSubmit', (data) => {
        if (data.length === 27) {
            io.to(socket.id).emit('newTag', NAME.OPTIONSCONTAINERPROFILE.NEWTAG(data))
        };
    });

    socket.on('searcher', (data) => {
        io.to(socket.id).emit('optionsContainerSearcher', NAME.OPTIONSCONTAINERSEARCH.HTML);
    });

    var toSend = '';
    socket.on('parameters', (data) => {
        dataFormat = `<div>${data[0]}${data[1]} <abbr title='${data[2]}'>${data[3]}</abbr>${data[4]} ${data[5]}<br></div>`;
        data.forEach((el) =>{ 
            if (el!=''){
                if (data.indexOf(el) == 3){
                    toSend += ` '${el}'`
                } else {toSend += ` ${el}`}}
        });
        io.to(socket.id).emit('searchCond', {'front': dataFormat})
    });

    socket.on('clearCond', () => {
        toSend = '';
        io.to(socket.id).emit('clearCond', '')
    })

    socket.on('searchSubmit', () => {
        let _sql = `SELECT * FROM iota_tx_reader2.transactions WHERE` + toSend;
        console.log(_sql);
        var butList = [];
        var toCache = [];
        pool.query(_sql, (err, res) => {
            res.forEach((el) => {
                toCache.push(el)
                butList.push(`${el.name}Button`)
                let _response = {
                    'front': `<p>Hash: ${el.name}`+
                    `<br>`+
                    `Date: ${new Date(el.timestamp*1000)}`+
                    `<br>`+
                    `<button id=${el.name}Button value=${toCache.indexOf(el)}>Expand</button>`+
                    `</p>`,
                    'back': el,
                    'buttons': butList
                };
                io.to(socket.id).emit('searchResponse', _response)
            });
        });

        var res = NAME.RESPONSE


        socket.on('sortThis', (order) => {
            let butListSorted = [];
            let toCacheSorted = toCache;
            let toCacheTemp = []
            io.to(socket.id).emit('clearSearch', '')

            toCacheSorted.forEach((el) => {
                if ((el.timestamp*1000 < Date.parse(order[2])) && (el.timestamp*1000 > Date.parse(order[1]))) {
                    toCacheTemp.push(el);};
            });

            if (order[0] ==='desc') {
            // https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
                toCacheTemp.sort((x,y) => {
                    return x.timestamp - y.timestamp;
                });
            } else if (order[0] ==='asc') {
                toCacheTemp.sort((x,y) => {
                    return y.timestamp - x.timestamp;
                });
            };

            toCacheTemp.forEach((el) => {
                butListSorted.push(`${el.name}Button`)
                let _response = {
                    'front': `<p>Hash: ${el.name}`+
                    `<br>`+
                    `Date: ${new Date(el.timestamp*1000)}`+
                    `<br>`+
                    `<button id=${el.name}Button value=${toCacheSorted.indexOf(el)}>Expand</button>`+
                    `</p>`,
                    'back': el,
                    'buttons': butListSorted
                    };
                io.to(socket.id).emit('searchResponse', _response)
            });
        });

        socket.on('expandThis', (dataToExpand) => {
            res['trytes']['content'] = toCache[dataToExpand].trytes;
            res['structured']['hash'] = toCache[dataToExpand].name;
            res['structured']['timestamp'] = toCache[dataToExpand].timestamp;
            res['structured']['address'] = toCache[dataToExpand].trytes.slice(2187,2268);
            res['structured']['tag'] = toCache[dataToExpand].trytes.slice(2592,2619);
            res['structured']['message'] = toCache[dataToExpand].trytes.slice(0,2187);
            io.to(socket.id).emit('expandThat', [res.structured.options,res.structured,true])   

        });  

        socket.on('swapExpand', (cond) => {
            io.to(socket.id).emit('expandThat', [res[cond].options,res[cond],false])   
        });

        socket.on('decrypt', () => {
            io.to(socket.id).emit('decryptResponse', 'Recibida info, falta implementación')   
        });

        socket.on('clearSearch', () => {
            io.to(socket.id).emit('clearSearch', '')
        })
    });


});


// LIST OF REGISTERED TAGS
//HORNET99INTEGRATED99999AGMO
//KILROY9WAS9HERE999999999999
//MINEIOTADOTCOM9999999999999


// LIST OF REGISTERED ADDRESSES
//ONVRLQLQXGLSNWOZCPSXJ9RPG9ZJOCEUGFBHCVYBZS9KYIPBJSLRNWDROFZ9CWNQOWCAMLVXBDJRGXFG9
//AUALLDPCZSJMHECUNTECFQJLJIKIENAKPLBGLOEXZX9RCNQNWFJZ9ENINZAHQKKLILIHRHNEM9WJUVWXD