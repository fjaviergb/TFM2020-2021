const Converter = require('@iota/converter');
const Iota = require('@iota/core');

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });

const depth = 3;
const minimumWeightMagnitude = 14;
const address =
'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

const seed =
'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

const message = JSON.stringify("Hello world");
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
    {
        value: 1,
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
