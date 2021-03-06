from iota import Iota, TryteString, ProposedTransaction, Address, Tag
import random
import json

from iota.transaction.creation import ProposedBundle

api = Iota('https://nodes.thetangle.org:443')

# SEED CREATED BY PSEUDO-RAND IN PYTHON - NOT SECURE
seed = 'WVVBOHNRYPONH9GW9BXVAKGGYBULIUPCDVTFSUAFFJP99NTJTGGQRWQCXSWELVDQIRFINIQDMULGEXSWN'

# ADDRESSES LIST
# [0] = WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D = 'MAQUINA 1'
# [1] = OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB = 'MAQUINA 2'
address = ['WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D', 'OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB']

# TAG LIST - CREATED BY PSEUDO-RAND WITH PYTHON
# [0] = 'BXOUBCAEOYFDQARTUELBFEEGPAO' = 'WIP'
# [1] = 'COBWNGDNZTEAEPVHGBBBFAGUWOI' = 'IDLE'
# [2] = 'QKLOVCRJHKHITJRIMVARCMPXBBT' = 'ERROR'
tag = ['BXOUBCAEOYFDQARTUELBFEEGPAO','COBWNGDNZTEAEPVHGBBBFAGUWOI','QKLOVCRJHKHITJRIMVARCMPXBBT']
#message = [TryteString.from_unicode('Ruido')]
#TryteString.from_unicode('OsT5K0XPH7AmiaSkkMbOEFshcYzUW20MqNFxF5nJNSxQBLayZde0PJqK0tr3T6AGQIM/JnFj5OAM3rz22TuqUrAMVZ2qscU0AdnrPBh+y3lwyqpfS9HNfeEOPHS5I4aDaXE+3TQ/SzvdB+PwRTiBsbTxFADF/TTjCGnL5FyTPBc='),
#TryteString.from_unicode('Ks3rjLZP5yMMckrJfdeaPHQ0EomE4lJyH9Ni8CqH/0MvSPP8FXufMmEtPsD0fhkyvkeTwOggLPn6eSvkvPpX7QNl76wN35YOTbdqFgnXd3zqcUNkd/xPmv1uMG1BfJ8MrxaOoh0Tr7D1oaLrpcVCDVoxAEKEEThFTc70sm0Awxk='),
message = [TryteString.from_unicode('Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto')]

for i in range(4):

    tx = ProposedTransaction(
        address = Address(random.choice(address)),
        message = random.choice(message),
        value = 0,
        tag = Tag(random.choice(tag))
    )

    result = api.send_transfer(transfers=[tx])

    print('Transacción %s enviada correctamente' % (i))

#api.broadcast_bundle('VLHOVQQIVFGLUIPUMWTFATCRMVKHEMLTINE9OWHCGYDVLFOZRSQYWSFIIPKCWJVLBMFUCWIT9HBS99999')


