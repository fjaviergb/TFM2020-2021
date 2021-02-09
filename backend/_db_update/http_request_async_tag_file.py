import json
import asyncio
import aiohttp
import mysql.connector
import pandas as pd
from pandas.io import sql
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
# NECESITA pip install PyMySQL y el conector

engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="PutosRusosSQL13186",
                               db="TFM_DB2"))

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'https://nodes.thetangle.org:443'
_url = 'http://92.22.55.226:14265'

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

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB2",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

df_temp = pd.DataFrame(columns=['name'])
df_temp.to_sql('temp_table', engine, if_exists ='replace',index=False)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor,'tags'))