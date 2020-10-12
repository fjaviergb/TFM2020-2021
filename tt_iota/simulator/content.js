const express = require('express');
const app = express();
const Iota = require('@iota/core');
const Tconverter = require('@iota/transaction-converter')

var cors = require('cors');

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));
app.use(express.json());

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });
  
app.post('', (req, res) => {
    console.log(req.body.address);
    const hash = req.body.address;

iota.getBundle(hash)
    .then(bundle => {
        res.send(Tconverter.asTransactionTrytes(bundle[0]).substr(0,2187));
    })
    .catch(err => {
        console.error(err);
        res.send('Error');
    });

});

app.listen(5500, () => {console.log(`Escuchando el puerto 5500...`);});


