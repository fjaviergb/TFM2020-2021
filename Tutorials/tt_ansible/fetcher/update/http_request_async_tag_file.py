import json
import asyncio
import aiohttp
import pandas as pd
from sqlalchemy import create_engine
import time
import os

PATH = os.getcwd()

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

async def fetch(client,_key,row):
    _data = json.dumps({
        "command": "findTransactions",
        "%s" % _key: [row[1]]
        }).encode("utf-8")
    async with client.post(_local, data=_data, headers=_headers) as resp:
        #assert resp.status == 200
        return await resp.text()

async def attachDB():
    connection = engine.connect()
    connection.execute("INSERT IGNORE INTO temp_hashes SELECT * FROM temp_table")
    connection.close()

async def _client(connection,_key,row):
    async with aiohttp.ClientSession() as client:
        html = await fetch(client,_key,row)
        try:
            print("Requesting {}, length {}".format(_key,row[0],len(json.loads(html)['hashes'])))
            df = pd.DataFrame(columns=['name'])
            df['name'] = json.loads(html)['hashes']
            df.to_sql('temp_table', engine, if_exists ='append',index=False)
        except KeyError:
            print("Exception empty; incomplete; etc")

async def main(connection,_key):
    sql_query = "SELECT * FROM %s" % _key
    records = connection.execute(sql_query)
    records = records.fetchall()
    tasks=[]

    for row in records:
        tasks.append(asyncio.create_task(_client(connection,_key,row)))
    await asyncio.gather(*tasks)
    await attachDB()

print(time.ctime(time.time()))
df_temp = pd.DataFrame(columns=['name'])
df_temp.to_sql('temp_table', engine, if_exists ='replace',index=False)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(connection,'tags'))
connection.close()