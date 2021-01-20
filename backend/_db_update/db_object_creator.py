import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime
from iota import Transaction,TryteString
import csv
import pandas as pd
from iota.trits import int_from_trits
import os
import numpy as np
import math


db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader2",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'http://192.168.1.33:14265'
_url = 'https://nodes.thetangle.org:443'


async def fetch(client,elem):
    _data = json.dumps({
            "command": "getTrytes",
            "hashes": elem
            }).encode("utf-8")
    async with client.post(_local, data=_data, headers=_headers) as resp:
        #assert resp.status == 200
        return await resp.text()

async def _transaction(_list,df,db,mycursor):
    df['trytes']=_list
    df[['timestamp','address','tag']]=list(map(lambda x: [int_from_trits(TryteString(x[2322:2331]).as_trits()),x[2187:2268],x[2592:2619]], _list))
    df.to_csv('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\iota_tx_reader2\\dataframe.csv',header=False,mode='a',index=False,columns= ['name','timestamp','address','tag','trytes'])


async def _client(db,mycursor,records_mapped):
    df = pd.DataFrame(columns=['name','timestamp','address','tag','trytes'])
    df['name'] = records_mapped
    async with aiohttp.ClientSession() as client:
            html = await fetch(client,records_mapped)
            try:
                print('Receiving... %s' % len(json.loads(html)['trytes']))
                await asyncio.create_task(_transaction(json.loads(html)['trytes'],df,db,mycursor))
            except KeyError:
                print("Empty; incomplete; etc")

async def main(db,mycursor):
        sql_join = "SELECT DISTINCT temp_hashes.name \
                    FROM temp_hashes \
                    WHERE temp_hashes.name \
                    NOT IN (SELECT transactions.name FROM transactions);"
        mycursor.execute(sql_join)

        records = mycursor.fetchall()
        print(len(records))
        if len(records) > 10000:
            iter_num = math.ceil(len(records) / 10000)
        else: 
            iter_num = 1
        tasks=[]
        for iter in np.array_split(records,iter_num):
            print('Sending... %s' % len(iter))
            records_filtered = filter(lambda x: len(x[0])==81, iter)
            records_mapped = list(map(lambda x: x[0], records_filtered))
            tasks.append(asyncio.create_task(_client(db,mycursor,records_mapped)))
            await asyncio.sleep(30)

        await asyncio.gather(*tasks)

        sql_file="LOAD DATA INFILE 'dataframe.csv' IGNORE INTO TABLE transactions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n'"
        mycursor.execute(sql_file)
        db.commit()

loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor))    
os.remove('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\iota_tx_reader2\\dataframe.csv')


