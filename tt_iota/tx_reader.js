const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });

    const tailTransactionHash = '9GYNEDTAGYGS9RZFWZBVWZIXOUALMEMXKXULLMTCYXIEROMFS9AGKEZMRUHQV9UXCKGUTIDTEKNBA9999';

iota.getBundle(tailTransactionHash)
.then(bundle => {
    console.log(iota.getTrytes(bundle));
})
.catch(err => {
    console.error(err);
});
