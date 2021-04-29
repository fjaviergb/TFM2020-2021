import json
import asyncio
import aiohttp
from iota import TryteString
import pandas as pd
from iota.trits import int_from_trits
import numpy as np
import math
from pandas.io import sql
from sqlalchemy import create_engine
import time
import os

PATH = os.path.dirname(os.path.realpath(__file__))

with open("{}/../config.txt".format(PATH)) as f:
  config = json.load(f)

with open("{}/../node.txt".format(PATH)) as f:
  _local = f.read()

engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                       .format(user=config['user'],
                               pw=config['password'],
                               host=config['host'],
                               db=config['database'],
                               port=config['port']))
connection = engine.connect()

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

async def fetch(client,elem):
    _data = json.dumps({
            "command": "getTrytes",
            "hashes": elem
            }).encode("utf-8")
    async with client.post(_local, data=_data, headers=_headers) as resp:
        #assert resp.status == 200
        return await resp.text()

async def _transaction(_list,df):
    df['trytes']=_list
    df[['timestamp','address','tag','bundlehash','bundleindex']]=list(map(lambda x: [int_from_trits(TryteString(x[2322:2331]).as_trits()),
                                                      x[2187:2268],x[2592:2619],x[2340:2421],
                                                      int_from_trits(TryteString(x[2331:2340]).as_trits())],
                                                      _list))
    sql.to_sql(df,con=engine,name='transactions',if_exists='append',index = False,chunksize=100)

async def _client(records_mapped):
    df = pd.DataFrame(columns=['name','timestamp','address','tag','bundlehash','bundleindex','trytes'])
    df['name'] = records_mapped
    async with aiohttp.ClientSession() as client:
            html = await fetch(client,records_mapped)
            try:
                print('Receiving per tick... %s' % len(json.loads(html)['trytes']))
                await asyncio.create_task(_transaction(json.loads(html)['trytes'],df))
            except KeyError:
                print("Empty; incomplete; etc")

async def main(connection):
        sql_join = "SELECT DISTINCT temp_hashes.name \
                    FROM temp_hashes \
                    WHERE temp_hashes.name \
                    NOT IN (SELECT transactions.name FROM transactions);"
        records = connection.execute(sql_join)

        records = records.fetchall()
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
            tasks.append(asyncio.create_task(_client(records_mapped)))
            await asyncio.sleep(25)

        await asyncio.gather(*tasks)

print(time.ctime(time.time()))
loop = asyncio.get_event_loop()
loop.run_until_complete(main(connection))    
connection.close()

