import iota_client
import os
import hashlib
import pandas as pd
import random

# GENERATING 
# client will connect to testnet by default
# rnd_seed = hashlib.sha256(os.urandom(256)).hexdigest()
# print(rnd_seed)
IOTA_SEED_SECRET = '702f9dba423a4889f1bd3e5f6c48734f6eedc991f86af89137addd2991d981e3'

# GENERATING ADDRESS
client = iota_client.Client()
print(client)
# address_changed_list = client.get_addresses(
#     seed=IOTA_SEED_SECRET,
#     account_index=0,
#     input_range_begin=0,
#     input_range_end=10,
#     get_all=True
# )
# print(address_changed_list)
#messages = ['Prueba1'.encode('utf-8'),'Prueba2'.encode('utf-8'),'Prueba3'.encode('utf-8')]
messages = ['Ruido'.encode("utf8"),'OsT5K0XPH7AmiaSkkMbOEFshcYzUW20MqNFxF5nJNSxQBLayZde0PJqK0tr3T6AGQIM/JnFj5OAM3rz22TuqUrAMVZ2qscU0AdnrPBh+y3lwyqpfS9HNfeEOPHS5I4aDaXE+3TQ/SzvdB+PwRTiBsbTxFADF/TTjCGnL5FyTPBc='.encode("utf8")
,'Ks3rjLZP5yMMckrJfdeaPHQ0EomE4lJyH9Ni8CqH/0MvSPP8FXufMmEtPsD0fhkyvkeTwOggLPn6eSvkvPpX7QNl76wN35YOTbdqFgnXd3zqcUNkd/xPmv1uMG1BfJ8MrxaOoh0Tr7D1oaLrpcVCDVoxAEKEEThFTc70sm0Awxk='.encode("utf8")]
identifiers = ['Ident1', 'Ident2','Ident3','Ident4']
#identifiers = ['TFM']
# encoding utf string into list of bytes
# some_utf_data = "Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto Hace tiempo me encargaron la de un relativamente corto".encode("utf8")

for i in range(10):
    message = client.message(
        index=random.choice(identifiers), data=random.choice(messages)
    )
    print(message)


#print(client.get_message_metadata("877f8171c557f59dc480a9c70739b6bf61c37f6ef25aa68da7b204271638c5bf"))
#print(client.get_message_data("435a8518856c9e42bd90a8af6ee362fe43f3295fef79b5a255ff1450b3bf74af"))
# print(len(client.find_messages(['877f8171c557f59dc480a9c70739b6bf61c37f6ef25aa68da7b204271638c5bf'])))
# brute = client.find_messages(['TFM'])
# brutedf = pd.DataFrame(brute)
# print(brutedf['payload'].apply(lambda x: bytearray(x['indexation'][0]['data']).decode('utf-8') ,1))
# print(client.get_message_metadata("3573563030cbcb54c3f948961d7e74c2a1358617d39e7f88ffec8ea440f52faf"))
# print(brutedf['message_id'].apply(lambda x: client.get_message_metadata(x)['referenced_by_milestone_index'],1))
# print(brutedf['message_id'].apply(lambda x: client.get_milestone(client.get_message_metadata(x)['referenced_by_milestone_index'])['timestamp'],1))
# print(client.get_milestone(228527))