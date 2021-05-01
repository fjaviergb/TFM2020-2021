from iota import Iota, TryteString, ProposedTransaction, Address, Tag
import random

api = Iota('https://iota.etsii.upm.es')

# SEED CREATED BY PSEUDO-RAND IN PYTHON - NOT SECURE
seed = 'WVVBOHNRYPONH9GW9BXVAKGGYBULIUPCDVTFSUAFFJP99NTJTGGQRWQCXSWELVDQIRFINIQDMULGEXSWN';

# ADDRESSES LIST
# [0] = WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D = 'MAQUINA 1'
# [1] = OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB = 'MAQUINA 2'
# [2] = QFITDFGMRYKOXUKJCPTUDSDTENNVDNSOVKYSGOJREOREQFIIZZBVGCANIQIKBHSPOOXSWDMJYCPVUOYXW = 'MAQUINA 3'
# [3] = KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY = 'MAQUINA 4'
# [4] = KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY = 'MAQUINA 5'
# [5] = TXAMWUYOHHRQYYOTUCZV9DRZZCKPGJAVSNI9UAWXVGLSUHSYEKFETOWCIKUBHBMFPURPDHAESAGYWPISB = 'MAQUINA 6'
# [6] = XNJDNQLQGMOTCWBQYP9FV9YXNUFMTRCWPQWQQSB9KLLTTHSOLFPCRFLVVLYEDDABO9SAVFLDGAYTGVETY = 'MAQUINA 7'
# [7] = KXLZGSOJ9BNACFHEGWBNGMHHLYKQPMUPKY9AZIDSQSCEUTOYKJPTEAMXRXOVSBWXKGEWFIDHYNSOYYTJD = 'MAQUINA 8'
# [8] = YTP9SYJYVGQCTCRZDUMOA9VNGVYSIYYQDJSXMBILIRXJMMOVUFYGIROVDPNTKLPGSDQATGTNL9ZTMXUAY = 'MAQUINA 9'
# [9] = VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB = 'MAQUINA 10'
address = ['WRIIHMSNYWKGRNRWLLPTANKPYIYXIOWKFYSWOPCZMQIEAFQVWJKVMOSOBEMVOOBGUJISAZFQAPFQXIO9D','OCXYFTDWYSWGTNUNAYVAFPYNIXKLGGJCCJRKN9NTFKCMKBTPVUCKWTXUVEBFDLIBYZUIPCESNIVBCVIGB','QFITDFGMRYKOXUKJCPTUDSDTENNVDNSOVKYSGOJREOREQFIIZZBVGCANIQIKBHSPOOXSWDMJYCPVUOYXW','KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY','KYMLQZL9OSZFQOWXYGRUSQUWFZJHUFZDLVEMMQOEOHLKWVRD9IKEWOSODLQHOFFIBVSYM9KGQGMJXJIWY','TXAMWUYOHHRQYYOTUCZV9DRZZCKPGJAVSNI9UAWXVGLSUHSYEKFETOWCIKUBHBMFPURPDHAESAGYWPISB','XNJDNQLQGMOTCWBQYP9FV9YXNUFMTRCWPQWQQSB9KLLTTHSOLFPCRFLVVLYEDDABO9SAVFLDGAYTGVETY','KXLZGSOJ9BNACFHEGWBNGMHHLYKQPMUPKY9AZIDSQSCEUTOYKJPTEAMXRXOVSBWXKGEWFIDHYNSOYYTJD','YTP9SYJYVGQCTCRZDUMOA9VNGVYSIYYQDJSXMBILIRXJMMOVUFYGIROVDPNTKLPGSDQATGTNL9ZTMXUAY','VORGJFZ9SRAI9DENSHTAZRAXECYOEXHKLGESHUNICKJTAEBJAYVBESTLLGVKYHMD9DQDCWPIQCVVLMAGB']

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



