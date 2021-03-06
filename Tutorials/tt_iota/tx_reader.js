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
//const _local = 'http://192.168.1.33:14265'
const _url = 'https://nodes.thetangle.org:443'
const _local = 'https://iota.etsii.upm.es'

const iota = Iota.composeAPI({
    provider: _local
    });

const _tag = 'MINEIOTADOTCOM9999999999999'
const _address = 'XQJQJT9OYSPGPQTHQJFFYAPIZDUAHIQLVKSLZKCYLHKDQRLZMLCZMUT9EBKGJTLYDNWKAMDRMGWJZ9999';
iota.findTransactions({addresses:[_address]})
.then(hashes => {
    // message = Tconverter.asTransactionTrytes(bundle[0]).substr(0,2187);
    console.log(hashes);
})
.catch(err => {
    console.error(err);
});

// 2187 T signaturemessage
// 90 T address
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
