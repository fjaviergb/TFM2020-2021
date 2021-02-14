from asyncio.windows_events import NULL
import json
import asyncio
import aiohttp
import mysql.connector
from iota import TryteString
import pandas as pd
from iota.trits import int_from_trits
import os
import numpy as np
import math
from pandas.io import sql
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
import time

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB2",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="PutosRusosSQL13186",
                               db="TFM_DB2"))

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'https://nodes.thetangle.org:443'
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
    sql.to_sql(df,con=engine,name='transactions',if_exists='append',index = False,chunksize=100)

async def _client(db,mycursor,records_mapped):
    df = pd.DataFrame(columns=['name','timestamp','address','tag','trytes'])
    df['name'] = records_mapped
    async with aiohttp.ClientSession() as client:
            html = await fetch(client,records_mapped)
            try:
                print('Receiving per tick... %s' % len(json.loads(html)['trytes']))
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
        print('Object creator %s objects' % len(records))
        if len(records) > 10000:
            iter_num = math.ceil(len(records) / 10000)
        else: 
            iter_num = 1
        tasks=[]
        for iter in np.array_split(records,iter_num):
            print('Objects per tick... %s' % len(iter))
            records_filtered = filter(lambda x: len(x[0])==81, iter)
            records_mapped = list(map(lambda x: x[0], records_filtered))
            tasks.append(asyncio.create_task(_client(db,mycursor,records_mapped)))
            await asyncio.sleep(30)

        await asyncio.gather(*tasks)

print(time.ctime(time.time()))
loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor))    


