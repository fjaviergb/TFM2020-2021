// ##################################
// __INIT__
// ##################################
// express maneja el servidor
const express = require('express');
const SocketIO = require('socket.io');
const mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "PutosRusosSQL13186",
  database: "iota_tx_reader2",
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
    var idcl = 0;

    console.log('Nueva conexión', socket.id);
    io.to(socket.id).emit('frontPage', {
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
              clients.saveClient(data[0],socket.id)
              //TODO: password
              console.log(clients.clientList)
              io.to(socket.id).emit('registerStatus','<p>Successful!</p>')
              io.to(socket.id).emit('backPage',{
                'front':
                '<div id=\'options\'>'+
                '<button id=\'profile\' type=\'submit\'>Profile</button>'+
                '<button id=\'searcher\' type=\'submit\'>Searcher</button>'+
                '</div>'+
                '<div id=\'optionsContainer\'></div>',
                'page': 'backPage',
                'user': result,
                });
                idcl = result[0].idcl;
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
                  clients.saveClient(data[0],socket.id)
                  //TODO: password
                  console.log(clients.clientList)
                  io.to(socket.id).emit('loginStatus','<p>Successful!</p>');
                  io.to(socket.id).emit('backPage',{
                    'front':
                    '<div id=\'options\'>'+
                    '<button id=\'profile\' type=\'submit\'>Profile</button>'+
                    '<button id=\'searcher\' type=\'submit\'>Searcher</button>'+
                    '</div>'+
                    '<div id=\'optionsContainer2\'></div>',
                    'page': 'backPage',
                    'user': result,
                    });
                    idcl = result[0].idcl;
                }
                else {io.to(socket.id).emit('loginStatus','<p>User Not found</p>')}
              };
        });
    }); 

    socket.on('profile', (data) => {
        // TODO: buscar addresses y tags que tiene el usuario y displayearlas
        io.to(socket.id).emit('optionsContainerProfile',{
            'front':
            '<div id=\'profileContainer\'>'+
            '<input type=\'text\' id=\'regAddress\'>New Address</input>'+
            '<button id=\'addressSubmit\' type=\'submit\'>Add</button>'+
            '<br>'+
            '<input type=\'text\' id=\'regTag\'>New Tag</input>'+
            '<button id=\'tagSubmit\' type=\'submit\'>Add</button>'+
            '<br>'+
            '<div id=\'listAddresses\'><p>List of addresses</p></div>'+
            '<br>'+
            '<div id=\'listTags\'><p>List of tags</p></div>'+
            '</div>',
            'back': ['addressSubmit','tagSubmit','listAddresses','listTags'],
        });
    });

    socket.on('searcher', (data) => {
        io.to(socket.id).emit('optionsContainerSearcher',{
            'front':
            '<div id=\'searchContainer\'>Choose between options'+
            '<br>'+
            `<form>`+

            '<select name=\'parenthStart\' multiple>'+
            '<option value=\'(\'>(</option>'+
            '<option selected="selected" value=\'\'>null</option>'+      
            '</select>'+

            '<select name=\'ifOptions\' id=\'ifOption\' multiple>'+
            '<option selected="selected" value=\'\'>YES</option>'+
            '<option value=\'NOT\'>NOT</option>'+      
            '</select>'+

            '<select name=\'searchOptions\' id=\'searchOption\' multiple>'+
            '<option value=\'address=\'>Address</option>'+
            '<option value=\'tag=\'>Tag</option>'+
            '<option selected="selected" value=\'\'>null</option>'+
            '</select>'+

            '<input type=\'text\' name=\'contentOptions\' id=\'contentOption\'></input>'+
            // TODO: PONER LISTA DE ADDRESSES/TAGS ASOCIADAS AL CLIENTE

            '<select name=\'parenthEnd\' multiple>'+
            '<option value=\')\'>)</option>'+
            '<option selected="selected" value=\'\'>null</option>'+      
            '</select>'+

            '<select name=\'logicOptions\' id=\'logicOption\' multiple>'+
            '<option value=\'AND\'>AND</option>'+
            '<option value=\'OR\'>OR</option>'+
            '<option value=\'XOR\'>XOR</option>'+     
            '<option selected="selected" value=\'\'>null</option>'+
            '</select>'+

            `</form>`+
            '<br>'+
            '<button id=\'addSearch\' type=\'submit\'>Add</button>'+
            '</div>'+
            '<div id=\'searchCond\'><p>Search conditions:</p></div>'+
            '<button id=\'clearCond\' type=\'submit\'>Clear</button>'+
            '<br>'+
            '<button id=\'searchSubmit\' type=\'submit\'>Search</button>'+
            '<br>'+
            '<p>Results: </p>'+
            '<div id=\'searchResult\'></div>'+
            '<button id=\'clearSearch\' type=\'submit\'>Clear</button>'+

            '<div id=\'orderContainer\'>'+
            '<form>'+
            '<select name=\'order\' multiple>'+
            '<option value=\'desc\'>desc</option>'+
            '<option value=\'asc\'>asc</option>'+ 
            '<option selected="selected" value=\'\'>null</option>'+                 
            '</select>'+
            '</form>'+
            '<button id=\'sortSearch\' type=\'submit\'>Sort</button>'+
            '</div>'+
            '</div>'+
            '<div id="myModal" class="modal">'+
            '<div class="modal-content">'+
            '</div>'+
            '</div>',
            'back': ['searchSubmit','addSearch','searchCond','searchResult','searchContainer','clearCond','clearSearch','sortSearch','orderContainer'],
            '_data': ['parenthStart','ifOptions', 'searchOptions', 'contentOptions', 'logicOptions','parenthEnd']
        });
    });

    socket.on('addressSubmit', (data) => {
        if (data.length === 90) {
            io.to(socket.id).emit('newAddress', `<p>${data}</p>
            <p><button id=${data}Button> Name as</button>
            <input type=\'text\' id=\'${data}Text\'></input></p>`)
        };
    });

    socket.on('tagSubmit', (data) => {
        if (data.length === 27) {
            io.to(socket.id).emit('newTag', `<p>${data}</p>
            <p><button id=${data}Button> Name as</button>
            <input type=\'text\' id=\'${data}Text\'></input></p>`)
        };
    });

    let toSend = ''
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
        var toCacheFix = [];
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
            toCacheFix = toCache.slice(0);
        });

        var res = {
            'trytes': {
                'type': 'trytes',
                'options': '<span class="close">&times;</span>'+
                `<input type="radio" id="structOption" name="expandOptions">`+
                `<label for="structOption">Structured</label><br></br>`+
                `<input type="radio" id="trytesOption" name="expandOptions">`+
                `<label for="trytesOption">AsTrytes</label><br>`+
                `<p class="text"></p>`
            },
            'structured': {
                'type': 'structure',
                'options': '<span class="close">&times;</span>'+
                `<input type="radio" id="structOption" name="expandOptions">`+
                `<label for="structOption">Structured</label><br></br>`+
                `<input type="radio" id="trytesOption" name="expandOptions">`+
                `<label for="trytesOption">AsTrytes</label><br>`+
                `<p class="text"></p>`+
                `<form>`+
                `<input type="radio" id="diffieHellman" name="decrypyOptions" value="diffieHellman">`+
                `<label for="diffieHellman">Diffie-Hellman</label><br>`+
                `<input type="radio" id="RSA" name="decrypyOptions" value="RSA">`+
                `<label for="RSA">RSA</label><br>`+
                `<input type="radio" id="DSA" name="decrypyOptions" value="DSA">`+
                `<label for="DSA">DSA</label><br>`+
                `<label for="pKey">Public Key:</label><br>`+
                `<input type="text" id="pKey" name="pKey"><br>`+
                `</form>`+
                '<button id=\'submitDecrypt\'>Decrypt</button>'+
                `<p class="text-decrypt"></p>`
                }
        };


        socket.on('sortThis', (order) => {
            let butListSorted = [];
            let toCacheSorted = toCache;

            if (order ==='desc') {
            // https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
                toCacheSorted.sort((x,y) => {
                    return x.timestamp - y.timestamp;
                });
            } else if (order ==='asc') {
                toCacheSorted.sort((x,y) => {
                    return y.timestamp - x.timestamp;
                });
            } else {toCacheSorted = toCacheFix;
            toCache = toCacheFix
            toCacheFix = toCache.slice(0)};

            toCacheSorted.forEach((el) => {
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
            butList = [];
            toCache = [];
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