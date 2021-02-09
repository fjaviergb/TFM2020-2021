const NodeRSA = require('node-rsa');

let secret = 'Valheim';

// const key = new NodeRSA({b: 1024})
// var private_key = key.exportKey('private');
// var public_key = key.exportKey('public');

private_key = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCOfqZZPoKm8l4XIqijT+id2ZnfFW92MrEMOFI4c7VaALZY42Uy
rCLDDqR98peSlgvRTVzZ3npvpeLIp04Q+Idt/2HkWDnAyh/4zqgO9R7HQoqpMo47
x2txW5nP3QafjyT2AVRualavPyyiiIFQym3YG+adF9CjAaC4HvbyTSRnhwIDAQAB
AoGBAItntG7TDRcvPoX7zmgXoUfsvvDVE7rbVQLThvzblqx6zeqgbTzp0whpptvh
HhC24tDdkt1DHx1jeT89Ds7jlfmzIUjLBp30HAh/FnXTcVU28/bZWEmygzHHJMNZ
SUYGjz+OGkt+c69MaNJaCQvWwv8xIwF/frkOmEfzJamHrUIhAkEA8b5XvPtjqCoD
gV5JP9N6lOZ8CChBckLk0gmHYo54e77OObOFSTnDsY3UQGYE59RG1EIFa5xKF1ot
MwR93Gv5OwJBAJbl7Nza5GWGv9WW3GU8D332iC3ucDhDYRIfNs5lDdOCft1TaalR
QBJW3HPajuqbJA2krYLWrMYcm8X+UZH2BiUCQQCJECji543bfOa75N+XJqqr3fqZ
DWn+BNuEEw8F3E2Hq+l1YcnCeNPxyb58PNuvLfZyxnQYTWbc0q4p7PQHk9idAkA4
9qsn5Gn7+ZZJZx3kCXw/rOVTkYNDegwW7zmdSICjq8uAeZCVnlp1kdy+z27MGazO
ibAGiEvIrdwQLiVU2G8RAkBLGxcSOHkO2PJIOvqywz2ZjPegh6D6xpL4ycogi1ws
QVJOHd1PU4mU7MYM9qImoJY0cUyJrQj5PEQBBWe5e5tJ
-----END RSA PRIVATE KEY-----`
public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOfqZZPoKm8l4XIqijT+id2Znf
FW92MrEMOFI4c7VaALZY42UyrCLDDqR98peSlgvRTVzZ3npvpeLIp04Q+Idt/2Hk
WDnAyh/4zqgO9R7HQoqpMo47x2txW5nP3QafjyT2AVRualavPyyiiIFQym3YG+ad
F9CjAaC4HvbyTSRnhwIDAQAB
-----END PUBLIC KEY-----`

stringData = 'Hola '

key_private = new NodeRSA(private_key);
key_public = new NodeRSA(public_key)

var encryptedData = key_private.encryptPrivate(secret, 'base64')
console.log(encryptedData);

try {
    var decryptedData = key_public.decryptPublic(`QqtTTLL05/G9hvAflT+qyQ5oknNkCSxnh1k6L+yx1KUkK7kTrAcaqvrdlVXd7t2Cq5qlRQVUY/D+JkOjhDiU8vJJISSIYAO/5i7G7eL7q7346ge+lWN3fbl+5tDoAcYgBEx5/hgCmtyTZQ3jHdxqgVepUtUJ09V0SFLsVXvymNE=`, 'utf8')
} catch (err) {decryptedData = ''}

console.log(stringData + decryptedData)
