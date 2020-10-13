// Backend 127.0.0.1:5500

const express = require('express');
const Iota = require('@iota/core');
const Tconverter = require('@iota/transaction-converter')
var cors = require('cors');

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

/////////////////////////////
// POST http listener
/////////////////////////////
app.post('', (req, res) => {

    /////////////////////////////
    // FINTRANSACTION METHOD
    /////////////////////////////
    const address = req.body.address;
    //const hash = req.body.hash;
    //const tag = req.body.tag;

    iota.findTransactions({addresses: [address]})
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
