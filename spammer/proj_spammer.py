import random
import iota_client
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

keyPair = RSA.generate(3072)

pubKey = keyPair.publickey()
#print(f"Public key:  (n={hex(pubKey.n)}, e={hex(pubKey.e)})")
pubKeyPEM = pubKey.exportKey()
print(pubKeyPEM.decode('ascii'))

#print(f"Private key: (n={hex(pubKey.n)}, d={hex(keyPair.d)})")
privKeyPEM = keyPair.exportKey()
print(privKeyPEM.decode('ascii'))

msg = b'A message for encryption'
encryptor = PKCS1_OAEP.new(pubKeyPEM.decode('ascii'))
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted))

decryptor = PKCS1_OAEP.new(privKeyPEM.decode('ascii'))
decrypted = decryptor.decrypt(encrypted)
print('Decrypted:', decrypted)

# client = iota_client.Client()
# print(client)

# for i in range(10):
#     message = client.message(
#         index=random.choice(identifiers), data=random.choice(messages)
#     )
#     print(message)