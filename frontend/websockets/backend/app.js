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
            'contact': data[2],
            'created': new Date(),
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
                idcl = result.insertId;
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

    // ##########
    // PROFILE
    // ##########

    var tagList = new Array();
    var tagResult = '';
    var addList = new Array();
    var addResult = '';

    socket.on('profile', () => {
        io.to(socket.id).emit('optionsContainer2', NAME.OPTIONSCONTAINERPROFILE.HTML);

        tagList = new Array();
        tagResult = '';
        addList = new Array();
        addResult = ''; 

        let _sql_tags = `SELECT * FROM iota_tx_reader2.tags, iota_tx_reader2.tag_names WHERE \
        iota_tx_reader2.tags.idta = iota_tx_reader2.tag_names.idta AND iota_tx_reader2.tag_names.idcl = ${idcl}`;
        pool.query(_sql_tags, (err, res) => {
            if (res) {
                res.forEach((el) => {
                    tagResult += NAME.OPTIONSCONTAINERPROFILE.NEWTAG(el.name,el.alias);
                    tagList.push({'html': NAME.OPTIONSCONTAINERPROFILE.NEWTAG(el.name,el.alias),'elem':el.name,'id': el.idta})
                });
            };
            io.to(socket.id).emit('newTag', {'html': tagResult, 'content': tagList})
            io.to(socket.id).emit('newTagDel', {'html': tagResult, 'content': tagList})
            
        });

        let _sql_addresses = `SELECT * FROM iota_tx_reader2.addresses, iota_tx_reader2.add_names WHERE \
        iota_tx_reader2.addresses.idad = iota_tx_reader2.add_names.idad AND iota_tx_reader2.add_names.idcl = ${idcl}`;

        pool.query(_sql_addresses, (err, res) => {
            if (res) {
                res.forEach((el) => {
                        addResult += NAME.OPTIONSCONTAINERPROFILE.NEWADDRESS(el.name,el.alias);
                        addList.push({'html': NAME.OPTIONSCONTAINERPROFILE.NEWADDRESS(el.name,el.alias),'elem':el.name,'id': el.idad})
                    });
            };
            io.to(socket.id).emit('newAddress', {'html': addResult, 'content': addList});
            io.to(socket.id).emit('newAddDel', {'html': addResult, 'content': addList});

        });   
    });

    socket.on('addressSubmit', (data) => {
        if (data.length === 90 || data.length === 81) {
            let _sql = 'INSERT IGNORE INTO iota_tx_reader2.addresses SET ?' ;
            var _data_add = {
                'name': data,
                'created': new Date()
            };
            pool.query(_sql, _data_add, (err, res) => {
                if (res) {
                    let _sql = 'INSERT INTO iota_tx_reader2.add_connector SET ?';
                    var _data_conn = {
                        'idcl': idcl,
                        'idad': res.insertId,
                    };
                    pool.query(_sql, _data_conn, (err, _res) => {
                        console.log('Succesfully saved')
                        addResult += NAME.OPTIONSCONTAINERPROFILE.NEWADDRESS(data,data);
                        addList.push({'html': NAME.OPTIONSCONTAINERPROFILE.NEWADDRESS(data,data),'elem':data,'id': res.insertId})
                        io.to(socket.id).emit('newAddress', {'html': addResult, 'content': addList});
                        io.to(socket.id).emit('newAddDel', {'html': addResult, 'content': addList});

                    });
                    let _query = {
                        'idname': res.insertId.toString() + idcl.toString(),
                        'alias': data,
                        'idcl': idcl,
                        'idad': res.insertId
                    };
                    let _sql_name = 'REPLACE INTO iota_tx_reader2.add_names SET ?' ;
                    pool.query(_sql_name, _query, (err, res) => {
                        console.log(err)
                        if (res) {
                            console.log('Named')
                        };
                    });        
                };
            });
        };
    });

    socket.on('tagSubmit', (data) => {
        if (data.length === 27) {
            let _sql = 'INSERT IGNORE INTO iota_tx_reader2.tags SET ?' ;
            var _data_tag = {
                'name': data,
                'created': new Date()
            };
            pool.query(_sql, _data_tag, (err, res) => {
                if (res) {
                    let _sql = 'INSERT INTO iota_tx_reader2.tag_connector SET ?';
                    var _data_conn = {
                        'idcl': idcl,
                        'idta': res.insertId,
                    };
                    pool.query(_sql, _data_conn, (err, res) => {
                        console.log('Succesfully saved')
                        tagResult += NAME.OPTIONSCONTAINERPROFILE.NEWTAG(data,data);
                        tagList.push({'html': NAME.OPTIONSCONTAINERPROFILE.NEWTAG(data,data),'elem':data,'id': res.insertId})
                        io.to(socket.id).emit('newTag', {'html': tagResult, 'content': tagList})
                        io.to(socket.id).emit('newTagDel', {'html': tagResult, 'content': tagList})

                    });
                    let _query = {
                        'idname': res.insertId.toString() + idcl.toString(),
                        'alias': data,
                        'idcl': idcl,
                        'idta': res.insertId
                    };
                    let _sql_name = 'REPLACE INTO iota_tx_reader2.tag_names SET ?' ;
                    pool.query(_sql_name, _query, (err, res) => {
                        console.log(err)
                        if (res) {
                            console.log('Named')
                        };
                    });
                };
            });
        };
    });

    socket.on('nameThis', (data) => {
        let _query = {
            'idname': data.id.toString() + idcl.toString(),
            'alias': data.name,
            'idcl': idcl,
        };
        if (data.elem.length === 90 || data.elem.length === 81) {
            _query['idad'] = data.id;
            let _sql = 'REPLACE INTO iota_tx_reader2.add_names SET ?' ;
            pool.query(_sql, _query, (err, res) => {
                if (res) {
                    console.log('Named')
                };
            });
        } else {
            _query['idta'] = data.id;
            let _sql = 'REPLACE INTO iota_tx_reader2.tag_names SET ?' ;
            pool.query(_sql, _query, (err, res) => {
                if (res) {
                    console.log('Named')
                };
            });
        };
        _query = {};
    });

    socket.on('delAdd', (data) => {
        let idname = data.id.toString() + idcl.toString()
        let _sql = `DELETE FROM iota_tx_reader2.add_names \
         WHERE iota_tx_reader2.add_names.idname = ${idname}`;
        pool.query(_sql, (err, res) => {
            console.log('Eliminado')
            io.to(socket.id).emit('refProfile', '');
        });
    });

    socket.on('delTag', (data) => {
        let idname = data.id.toString() + idcl.toString()
        let _sql = `DELETE FROM iota_tx_reader2.tag_names \
         WHERE iota_tx_reader2.tag_names.idname = ${idname}`;
        pool.query(_sql, (err, res) => {
            console.log('Eliminado')
            io.to(socket.id).emit('refProfile', '');
        });

    });

    // ##########
    // SEARCHER
    // ##########
    socket.on('searcher', () => {
        io.to(socket.id).emit('optionsContainer2', NAME.OPTIONSCONTAINERSEARCH.HTML);
        toSend = '';
        butList = [];
        toCache = [];

        let _sqlAdd = `SELECT * FROM iota_tx_reader2.addresses, iota_tx_reader2.add_names \
        WHERE iota_tx_reader2.add_names.idcl = ${idcl} AND \
        iota_tx_reader2.add_names.idad = iota_tx_reader2.addresses.idad`
        pool.query(_sqlAdd, (err,res) => {
            io.to(socket.id).emit('savedAddresses', res);
        });
        let _sqlTag = `SELECT * FROM iota_tx_reader2.tags, iota_tx_reader2.tag_names \
                WHERE iota_tx_reader2.tag_names.idcl = ${idcl} AND \
                iota_tx_reader2.tag_names.idta = iota_tx_reader2.tags.idta`
        pool.query(_sqlTag, (err,res) => {
            io.to(socket.id).emit('savedTags', res);

        });
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
        io.to(socket.id).emit('clearCond', '');
    })

    socket.on('searchSubmit', () => {
        let _sql = `SELECT * FROM iota_tx_reader2.transactions WHERE` + toSend;
        console.log(_sql);
        var toCache = [];
        var toHtml = '';
        pool.query(_sql, (err, res) => {
            res.forEach((el) => {
                toCache.push({'html': NAME.NEWRESPONSE.HTML(el), 'object': el})
                toHtml += NAME.NEWRESPONSE.HTML(el);
            });
            io.to(socket.id).emit('searchResponse', {'html': toHtml, 'toCache': toCache})
        });

        var res = NAME.RESPONSE

        socket.on('sortThis', (order) => {
            let toCacheSorted = toCache;
            let toCacheTemp = []
            toHtml = '';
            io.to(socket.id).emit('clearSearch', '')

            toCacheSorted.forEach((el) => {
                if ((el.object.timestamp*1000 < Date.parse(order[2])) && (el.object.timestamp*1000 > Date.parse(order[1]))) {
                    toCacheTemp.push(el);};
            });

            if (order[0] ==='desc') {
                toCacheTemp.sort((x,y) => {
                    return x.object.timestamp - y.object.timestamp;
                });
            } else if (order[0] ==='asc') {
                toCacheTemp.sort((x,y) => {
                    return y.object.timestamp - x.object.timestamp;
                });
            };
            toCacheTemp.forEach((el) => {
                toHtml += NAME.NEWRESPONSE.HTML(el.object);
            });
            io.to(socket.id).emit('searchResponse', {'html': toHtml, 'toCache': toCacheTemp})
        });

        socket.on('expandThis', (dataToExpand) => {
            res['trytes']['content'] = dataToExpand.trytes;
            res['structured']['hash'] = dataToExpand.name;
            res['structured']['timestamp'] = dataToExpand.timestamp;
            res['structured']['address'] = dataToExpand.trytes.slice(2187,2268);
            res['structured']['tag'] = dataToExpand.trytes.slice(2592,2619);
            res['structured']['message'] = dataToExpand.trytes.slice(0,2187);
            io.to(socket.id).emit('expandThat', [res.structured.options,res.structured])   
        });  

        socket.on('swapExpand', (cond) => {
            io.to(socket.id).emit('expandThat', [res[cond].options,res[cond]])   
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