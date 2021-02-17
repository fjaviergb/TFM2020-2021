const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Valheim';

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
crypto.scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  crypto.randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});