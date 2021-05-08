const { ClientBuilder } = require('@iota/client');
const fs = require('fs')
const NodeRSA = require('node-rsa');

// CLIENT TO TESNET
const client = new ClientBuilder().build();

var keys = []
for (i=1;i<4;i++) {
    var private_key = fs.readFileSync(`./priv${i}`, 'utf8');
    var key_private = new NodeRSA(private_key);
    keys.push(key_private)
}

var ifok = Math.random()
var statusO = 0

// DATA OKEY
if (ifok > 0.97) {
    var status = '999'
} else {var status = 'OK'}

// DATA HUM
if (ifok > 0.95 || ifok < 0.05) {
    var statusH = '999'
} else if (ifok >= 0.05 && ifok < 0.15) {
    var statusH = 'LOW'
} else if (ifok >= 0.15 && ifok <= 0.85) {
    var statusH = 'MEDIUM'
} else {var statusH = 'HIGH'}

if (ifok > 0.5) {
    statusO += 0.1
} else {
    statusO -= 0.1
}

// DATA TEMP
var temp = Math.random() * 3 + 1.5;
if (temp > 4.25) {
    var statusT = 'HIGH'
} else if (temp < 1.75) {
    var statusT = 'LOW'
} else {var statusT = 'MEDIUM'}

var data = {
    status: status,
    temperature: temp.toFixed(2),
    temperature_status: statusT,
    humidity: statusH,
    orientation: statusO.toFixed(1)
}
console.log(data)

// var encryptedData = key_private.encryptPrivate(secret, 'base64')

// const message = client.message()
//     .index('TFM')
//     .data(encryptedData)
//     .submit();

// console.log(message);
