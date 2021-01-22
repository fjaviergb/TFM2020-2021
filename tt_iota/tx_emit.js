const Converter = require('@iota/converter');
const Iota = require('@iota/core');

const iota = Iota.composeAPI({
    provider: 'http://192.168.1.33:14265'
    });

const depth = 3;
const minimumWeightMagnitude = 14;


const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
// const address = Iota.generateAddress(seed, 24)
// console.log(address)
const address = 'FVQLKWTHJBXYDHAECQSLOKMYWTZLVYGFPIOLGEQECBYUWVZFXNNSRNVXNLGZZJRIH9NEWJIJA9IOPSVQC';

const message = JSON.stringify("Prueba 1");
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
    ];

iota.prepareTransfers(seed, transfers)
.then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
})
.then(bundle => {
    console.log(bundle[0].hash)
})
.catch(err => {
    console.error(err)
});
