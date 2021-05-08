const { ClientBuilder } = require('@iota/client');
const fs = require('fs')
const NodeRSA = require('node-rsa');

// CLIENT TO TESNET
const client = new ClientBuilder().build();


var private_key = fs.readFileSync(`./priv1`, 'utf8');
var key_private = new NodeRSA(private_key);

var counter = 0;
var looper = setInterval(() => {
    var ifok = Math.random()
    var iffk = Math.random()
    var statusO = 0
    
    if (iffk < 0.95) {
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
        var temp = Math.random() * 5 + 3.5;
        if (temp > 8) {
            var statusT = 'HIGH'
        } else if (temp < 4) {
            var statusT = 'LOW'
        } else {var statusT = 'MEDIUM'}
        
        var data = {
            status: status,
            temperature: temp.toFixed(2),
            temperature_status: statusT,
            humidity: statusH,
            orientation: statusO.toFixed(1),
            data: new Date()
        }
        
        var encryptedData = key_private.encryptPrivate(JSON.stringify(data), 'base64')
    } else {
        var encryptedData = 'Ruido'
    }

    counter++;
    const message = client.message()
    .index('FJAVIGB_MEJILLONES')
    .data(encryptedData)
    .submit();
    console.log(counter);
    if (counter >= 100)
    {
        clearInterval(looper);
    }
}, 30000)
