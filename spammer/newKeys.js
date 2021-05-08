const NodeRSA = require('node-rsa');

const key = new NodeRSA({b: 1024});
var private_key = key.exportKey('private');
var public_key = key.exportKey('public');

console.log(private_key)
console.log(public_key)