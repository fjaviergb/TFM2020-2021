const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');
const Converter = require('@iota/converter');

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });

const tailTransactionHash = 'WPFRNTOUDPAJZUOFNMRKHSIOXCDXMICC9QZUQQNCDYDKUUNZMESJJHFVVBQCEYZKDVZCBUVXRPIY99999';

iota.getBundle(tailTransactionHash)
.then(bundle => {
    console.log(Converter.trytesToAscii(bundle[0]['signatureMessageFragment'].slice(0, -1)));
})
.catch(err => {
    console.error(err);
});

// iota.findTransactionObjects({addresses: addressesList})
// .then(transactions => {console.log(transactions[0]);})
// .catch(err => {console.log(err);});