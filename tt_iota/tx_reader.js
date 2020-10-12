const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');
const Converter = require('@iota/converter');
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

const tailTransactionHash = 'WPFRNTOUDPAJZUOFNMRKHSIOXCDXMICC9QZUQQNCDYDKUUNZMESJJHFVVBQCEYZKDVZCBUVXRPIY99999';

iota.getBundle(tailTransactionHash)
.then(bundle => {
    message = Tconverter.asTransactionTrytes(bundle[0]).substr(0,2187);
    console.log(trytesToAscii(message));
})
.catch(err => {
    console.error(err);
});

// 2187 T signaturemessage
// 81 T address
// 27 T value
// 27 T obsoletetag
// 9 T timestamp
// 9 T Current index
// 9 T Last index
// 81 T bundle hash
// 81 T trunck tx
// 81 T branch tx
// 27 T tag
// 9 T attachment timestamp
// 9 T attachment timestamp lowerbound
// 9 T attachment timestamp upperbound
// 27 T nonce
//
