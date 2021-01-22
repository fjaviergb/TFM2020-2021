from urllib import request
import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime
import csv
import os

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

async def attachDB(db,mycursor,_key,row,html):
    sql_file="LOAD DATA INFILE 'temp%s%s.csv' IGNORE INTO TABLE temp_hashes LINES TERMINATED BY ','"
    mycursor.execute(sql_file % (_key,row[0]))
    db.commit()

async def _client(db,mycursor,_key,row):
    async with aiohttp.ClientSession() as client:
        html = await fetch(client,_key,row)
        try:
            print("Requesting addresses {}, length {}".format(_key,row[0],len(json.loads(html)['hashes'])))
            with open("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\tfm_db\\temp%s%s.csv" % (_key,row[0]), 'w+', newline='') as csvfile:
                spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
                spamwriter.writerow(json.loads(html)['hashes'])
            csvfile.close()
            await attachDB(db,mycursor,_key,row,html)
            os.remove("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\tfm_db\\temp%s%s.csv" % (_key,row[0]))
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
    database="TFM_DB",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor,'addresses'))