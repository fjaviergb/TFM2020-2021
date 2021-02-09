from iota import Iota, TryteString, ProposedTransaction, Address, Tag
import random

api = Iota('https://iota.etsii.upm.es')

# SEED CREATED BY PSEUDO-RAND IN PYTHON - NOT SECURE
seed = 'WVVBOHNRYPONH9GW9BXVAKGGYBULIUPCDVTFSUAFFJP99NTJTGGQRWQCXSWELVDQIRFINIQDMULGEXSWN';

# ADDRESSES LIST
# [9] = VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB = 'MAQUINA 10'
address = ['VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB']

# TAG LIST - CREATED BY PSEUDO-RAND WITH PYTHON
# [0] = 'BXOUBCAEOYFDQARTUELBFEEGPAO' = 'WIP'
# [1] = 'COBWNGDNZTEAEPVHGBBBFAGUWOI' = 'IDLE'
# [2] = 'QKLOVCRJHKHITJRIMVARCMPXBBT' = 'ERROR'
tag = ['BXOUBCAEOYFDQARTUELBFEEGPAO','COBWNGDNZTEAEPVHGBBBFAGUWOI','QKLOVCRJHKHITJRIMVARCMPXBBT']

for i in range(1000):
    message = TryteString.from_unicode('13186 / N / %s' % (i))

    tx = ProposedTransaction(
        address = Address(random.choice(address)),
        message = message,
        value = 0,
        tag = Tag(random.choice(tag))
    )

    result = api.send_transfer(transfers=[tx])

    print('Transacción %s enviada correctamente' % (i))




