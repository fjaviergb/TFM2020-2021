const http = require('http');
const Iota = require('@iota/core');
const Tconverter = require('@iota/transaction-converter');

const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const trytesToAscii = (trytes) => {
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};
const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });

//'WPFRNTOUDPAJZUOFNMRKHSIOXCDXMICC9QZUQQNCDYDKUUNZMESJJHFVVBQCEYZKDVZCBUVXRPIY99999'

const server = http.createServer();
server.listen(3000);

server.on('submit', (req, sender, res) => {

    iota.getBundle(req)
    .then(bundle => {
        var message = Tconverter.asTransactionTrytes(bundle[0]).substr(0,2187);
        console.log(trytesToAscii(message));
    })
    .catch(err => {
        console.error(err);
    });

    res = message;
});

console.log('Listening to port 3000...')
