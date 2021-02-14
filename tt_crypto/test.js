var crypto = require('crypto')
  , key = 'salt'
  , plaintext = 'valheim'
  , cipher = crypto.createCipheriv('aes-256-cbc', key)
  , decipher = crypto.createDecipheriv('aes-256-cbc', key);


  var encryptedPassword = cipher.update(plaintext, 'utf8', 'base64');
    encryptedPassword += cipher.final('base64')
    console.log('encrypted :', encryptedPassword);
  
    var decryptedPassword = decipher.update(encryptedPassword, 'base64', 'utf8');
    decryptedPassword += decipher.final('utf8');      
    console.log('decrypted :', decryptedPassword);