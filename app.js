// Backend 127.0.0.1:5500

const express = require('express');
const Iota = require('@iota/core');
const Tconverter = require('@iota/transaction-converter')
var cors = require('cors');
const Joi = require('joi');

const app = express();
// Init http protocol

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });
// Init iota comm

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));
// Enable comm with http specified port
app.use(express.json());
// Enable json http

function validateReq(req) {
    const schema = Joi.object({
        addresses: Joi.array().items(Joi.string().length(90)),
        bundles: Joi.array().items(Joi.string().length(81)),
        tags: Joi.array().items(Joi.string().length(27))
    });

    return schema.validate(req);
};
// Function validate scheme request

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
    iota.findTransactions(req.body)
        .then(bundle => {
            //res.send(Tconverter.asTransactionTrytes(bundle[0]).substr(0,2187));
            res.send(bundle);
        })
        .catch(err => {
            console.error(err);
            res.send('Address not found');
        });

});

app.listen(5500, () => {console.log(`Escuchando el puerto 5500...`);});
// Script listen to specified port => initial message
