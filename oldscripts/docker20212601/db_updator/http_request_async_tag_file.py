import json
import asyncio
import aiohttp
import mysql.connector
import pandas as pd
from pandas.io import sql
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
# NECESITA pip install PyMySQL y el conector
import pymysql

engine = create_engine("mysql+pymysql://{user}:{pw}@database:{p}/{db}"
                       .format(user="root",
                               pw="13186",
                               p="3306",
                               db="TFM_DB"))

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'http://92.22.55.226:14265'
_url = 'https://nodes.thetangle.org:443'

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

async def _client(db,mycursor,_key,row):
    async with aiohttp.ClientSession() as client:
        html = await fetch(client,_key,row)
        try:
            print("Requesting tags {}, length {}".format(_key,row[0],len(json.loads(html)['hashes'])))
            df = pd.DataFrame(columns=['name'])
            df['name'] = json.loads(html)['hashes']
            df.to_sql('temp_table', engine, if_exists ='append',index=False)
        except KeyError:
            print("Exception empty; incomplete; etc")

async def main(db,mycursor,_key):
    sql_query = "SELECT * FROM %s" % _key
    mycursor.execute(sql_query)
    records = mycursor.fetchall()
    tasks=[]


    for row in records:
        tasks.append(asyncio.create_task(_client(db,mycursor,_key,row)))
    await asyncio.gather(*tasks)
    await attachDB()

db = pymysql.connect(
    host="database",
    user="root",
    port=3306,
    passwd="13186",
    database="TFM_DB",
)
mycursor = db.cursor()

df_temp = pd.DataFrame(columns=['name'])
df_temp.to_sql('temp_table', engine, if_exists ='replace',index=False)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor,'tags'))