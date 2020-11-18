from iota import TryteString
from iota.trits import int_from_trits
from iota.transaction.types import TransactionTrytes
#print(TryteString.as_integers(bin))

#tryte_string = TransactionTrytes('GZHTXDD99')
# ES IGUAL A:

tryte_string = TryteString('GZHTXDD99')
print(int_from_trits(tryte_string.as_trits()))

# INTENTO DE TRADUCIR CODIGO DE JAVASCRIPT
# def trytesToAscii(trytes):
#     TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
#     ascii = 0
#     for i in range(0,len(trytes)-1,2):
#         ascii += TRYTE_ALPHABET.index(trytes[i]) + TRYTE_ALPHABET.index(trytes[i + 1]) * 27
#     return ascii