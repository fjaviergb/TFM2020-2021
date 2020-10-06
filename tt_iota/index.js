const Iota = require('@iota/core');

const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });
    
    // Call the `getNodeInfo()` method for information about the IOTA node and the Tangle
    iota.getNodeInfo()
    // Convert the returned object to JSON to make the output more readable
    .then(info => console.log(JSON.stringify(info, null, 1)))
    .catch(err => {
        // Catch any errors
        console.log(err);
    });
