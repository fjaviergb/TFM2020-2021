// Backend 127.0.0.1:5500

/////////////////////////////
// INIT IMPORTS AND CONST
/////////////////////////////
const express = require('express');
const Iota = require('@iota/core');
const Tconverter = require('@iota/transaction-converter')
var cors = require('cors');
const Joi = require('joi');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const app = express();
// Init http protocol

const iota = Iota.composeAPI({
    'provider': 'http://79.153.255.183:80',
    });
// Init iota comm


app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));
// Enable comm with http specified port
app.use(express.json());
// Enable json http

/////////////////////////////
// FUNCTION VALIDATION
/////////////////////////////
function validateReq(req) {
    const schema = Joi.object({
        addresses: Joi.array().items(Joi.string().length(90)),
        bundles: Joi.array().items(Joi.string().length(81)),
        tags: Joi.array().items(Joi.string().length(27))
    });

    return schema.validate(req);
};


/////////////////////////////
// REACTIVE PROGRAMMING
/////////////////////////////
class Observable {
    constructor () {
        this.cbs = [];
    }
    suscribe(dd) {
        this.cbs.push(dd);
    }
    emit(x) {
        this.cbs.map(cb => cb(x));
    }
    pipe(...os) {
        return os.reduce((acc,o) => { 
            acc.suscribe(x => o.emit(x));
            return o;
        }, this)
    }
};

class Mapper {
    constructor (f) {
        this.ob = new Observable();
        this.f = f;
    }
    suscribe (cb) {
        this.ob.suscribe(cb);
    }
    emit (x) {
        this.ob.emit(this.f(x));
    }
};

function sendReq(data) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "http://localhost:5500/trytes");

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(JSON.stringify(data));
}

const Rx = {};
Rx.map = f => new Mapper(f);

const observable = new Observable();

observable.pipe(
    Rx.map(elem => {
        return({
            'message': elem.substr(0,2187),
            'address': elem.substr(2187,90),
            'timestamp': elem.substr(2331,9),
            'bundle': elem.substr(2349,81),  
            'tag': elem.substr(2592,27),
        })
    })
).suscribe(sendReq);


/////////////////////////////
// POST http listener
/////////////////////////////
app.post('', (req, res) => {

    const { error } = validateReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Send res in case wrong input

    /////////////////////////////
    // FINTRANSACTION METHOD
    /////////////////////////////
    iota.findTransactionObjects(req.body)
        .then(bundle => { 
            res.send(`${bundle.length}`);


            // iota.getTrytes(bundle)
            // .then(async trytes => {
            //     let count = 0;
            //     for (let elem of trytes) {
            //         let data = {
            //             'message': elem.substr(0,2187),
            //             'address': elem.substr(2187,90),
            //             'timestamp': elem.substr(2331,9),
            //             'bundle': elem.substr(2349,81),  
            //             'tag': elem.substr(2592,27),
            //         };
            //         count += 1;
            //     };
            // })
        })
        .catch(err => {
            console.error(err);
            res.send('Address not found');
        });
});

app.listen(5500, () => {console.log(`Escuchando el puerto 5500...`);});
// Script listen to specified port => initial message



