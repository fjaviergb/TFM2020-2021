from urllib import request
import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'http://192.168.1.33:14265'
_url = 'https://nodes.thetangle.org:443'

async def fetch(client,_key,row):
    _data = json.dumps({
        "command": "findTransactions",
        "%s" % _key: [row[1]]
        }).encode("utf-8")
    async with client.post(_local, data=_data, headers=_headers) as resp:
        #assert resp.status == 200
        return await resp.text()

async def _execute(db,mycursor,query,elem,row):
    sql_query = "INSERT INTO hashes (name, idta,idad,timestamp) VALUES (%s,%s,%s,%s)"
    sql_check = "SELECT name FROM hashes WHERE name = %s"
    sql_fix = "UPDATE hashes SET idad = %s, timestamp = %s WHERE name = %s"
    mycursor.execute(sql_check, (elem,))
    records = mycursor.fetchall()
    if len(records) == 0:
        mycursor.execute(sql_query, (elem,"-1", row[0],datetime.now()))
    # else:
    #     mycursor.execute(sql_fix, (row[0],datetime.now(),elem))
    db.commit()

async def attachDB(db,mycursor,_key,row,html):
    tasks = []
    for elem in json.loads(html)['hashes']:
        tasks.append(asyncio.create_task(_execute(db,mycursor,_key,elem,row)))
    await asyncio.gather(*tasks)

async def _client(db,mycursor,_key,row):
    async with aiohttp.ClientSession() as client:
        html = await fetch(client,_key,row)
        try:
            print(_key,row[0],len(json.loads(html)['hashes']))
            await attachDB(db,mycursor,_key,row,html)
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

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader2"
)
mycursor = db.cursor(buffered=True)

loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor,'addresses'))