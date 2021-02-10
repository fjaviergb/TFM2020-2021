const NodeRSA = require('node-rsa');

let secret = '13186-Prueba2-Encriptacion';

// GENERATOR
// const key = new NodeRSA({b: 1024})
// var private_key = key.exportKey('private');
// var public_key = key.exportKey('public');

// console.log(private_key)
// console.log(public_key)

// LIST
// private_key = `-----BEGIN RSA PRIVATE KEY-----
// MIICXQIBAAKBgQCOfqZZPoKm8l4XIqijT+id2ZnfFW92MrEMOFI4c7VaALZY42Uy
// rCLDDqR98peSlgvRTVzZ3npvpeLIp04Q+Idt/2HkWDnAyh/4zqgO9R7HQoqpMo47
// x2txW5nP3QafjyT2AVRualavPyyiiIFQym3YG+adF9CjAaC4HvbyTSRnhwIDAQAB
// AoGBAItntG7TDRcvPoX7zmgXoUfsvvDVE7rbVQLThvzblqx6zeqgbTzp0whpptvh
// HhC24tDdkt1DHx1jeT89Ds7jlfmzIUjLBp30HAh/FnXTcVU28/bZWEmygzHHJMNZ
// SUYGjz+OGkt+c69MaNJaCQvWwv8xIwF/frkOmEfzJamHrUIhAkEA8b5XvPtjqCoD
// gV5JP9N6lOZ8CChBckLk0gmHYo54e77OObOFSTnDsY3UQGYE59RG1EIFa5xKF1ot
// MwR93Gv5OwJBAJbl7Nza5GWGv9WW3GU8D332iC3ucDhDYRIfNs5lDdOCft1TaalR
// QBJW3HPajuqbJA2krYLWrMYcm8X+UZH2BiUCQQCJECji543bfOa75N+XJqqr3fqZ
// DWn+BNuEEw8F3E2Hq+l1YcnCeNPxyb58PNuvLfZyxnQYTWbc0q4p7PQHk9idAkA4
// 9qsn5Gn7+ZZJZx3kCXw/rOVTkYNDegwW7zmdSICjq8uAeZCVnlp1kdy+z27MGazO
// ibAGiEvIrdwQLiVU2G8RAkBLGxcSOHkO2PJIOvqywz2ZjPegh6D6xpL4ycogi1ws
// QVJOHd1PU4mU7MYM9qImoJY0cUyJrQj5PEQBBWe5e5tJ
// -----END RSA PRIVATE KEY-----`
// public_key = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOfqZZPoKm8l4XIqijT+id2Znf
// FW92MrEMOFI4c7VaALZY42UyrCLDDqR98peSlgvRTVzZ3npvpeLIp04Q+Idt/2Hk
// WDnAyh/4zqgO9R7HQoqpMo47x2txW5nP3QafjyT2AVRualavPyyiiIFQym3YG+ad
// F9CjAaC4HvbyTSRnhwIDAQAB
// -----END PUBLIC KEY-----`

// public_key = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLYP5ugUnj89FQzpOzuhj5pIJb
// 2dqhggYJLKnTBP9JM28G9O+q54Fy5rM2a2UMtRDmbImUdN7aNI4Q95KpDg6lX3Iq
// yLDX235u1i7m4L15lfODrwuOn5L1r19IMXJ0z3An2NlT0Cta1eDlNkP9lb23KdFi
// ICGNNmWevgPK7P+J1QIDAQAB
// -----END PUBLIC KEY-----`

// private_key = `-----BEGIN RSA PRIVATE KEY-----
// MIICWwIBAAKBgQCLYP5ugUnj89FQzpOzuhj5pIJb2dqhggYJLKnTBP9JM28G9O+q
// 54Fy5rM2a2UMtRDmbImUdN7aNI4Q95KpDg6lX3IqyLDX235u1i7m4L15lfODrwuO
// n5L1r19IMXJ0z3An2NlT0Cta1eDlNkP9lb23KdFiICGNNmWevgPK7P+J1QIDAQAB
// AoGAabpQBx+IH6UqmPO7U1DN9UF3qZleoblyPq9ku7BEvxCHHm3bCHfI2JJsS9G3
// u6X2hfS7gKQPENNhGTnURO1m6aItYJ10tU44DwZLGb9Uq1pukjzRfGcW44c39stw
// u6odlNqfdLmGP9XKzgwFoGNqPHUVNlZy3CbjRODtXLQwhJkCQQDrXBr3rrKasnWV
// OvZpgbQUzHJI8hNR374gW/TdjcHpVTza0twb4XKFpTCMOUYqnDW3cmXw99cAsrEc
// 8CoOavAfAkEAl5oW+Eq6ctpNpscOdDa4tSRTM6LkytM+UxDOhBrgLcTTCTVSGQ76
// /DDZ+7QfAoWKJH4MsfPyx2kwcpDIW5e3iwJAOAqdbT6OzqERuG/qvqKgs5ce21mw
// 2fzxs5jRzHN1qc6fB+fPe2AKOeJkle8JUxoQ/FZkCaWp70OdQqu5B+fUtwJALgMr
// o5Jywnc1iD/0SBtvtjLfOdXf4Rt6WBXKyFer4NhTQQE4+LgOP0rIble97bMAOZE0
// YzJqZlGrzanZ1crXfwJAN8v+4G3RpzTelpUFq9aAWPLWaikdnCoHLKxeg5IxEUCi
// OnB0HkrZoFEhOPh+FNBlbCRzQcgoRtTHJ2pA8qTAwA==
// -----END RSA PRIVATE KEY-----`

key_private = new NodeRSA(private_key);
key_public = new NodeRSA(public_key)

var encryptedData = key_private.encryptPrivate(secret, 'base64')
console.log(encryptedData);

try {
    var decryptedData = key_public.decryptPublic('OsT5K0XPH7AmiaSkkMbOEFshcYzUW20MqNFxF5nJNSxQBLayZde0PJqK0tr3T6AGQIM/JnFj5OAM3rz22TuqUrAMVZ2qscU0AdnrPBh+y3lwyqpfS9HNfeEOPHS5I4aDaXE+3TQ/SzvdB+PwRTiBsbTxFADF/TTjCGnL5FyTPBc=', 'utf8')
} catch (err) {decryptedData = ''}

console.log(decryptedData)
