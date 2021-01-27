import asyncio
import mysql.connector
from datetime import datetime
from iota import Iota, AsyncIota
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)
mycursor = db.cursor(buffered=True)

#_tags = ['HORNET99INTEGRATED99999A9VO','CORONAMINUSAUSSCHUSS99SVLZT']
_provider = 'http://79.152.49.211:80'
_aiota = AsyncIota(_provider)
#_hash = ['QBDXD9PIFCTPPT9N9DSMEIVLJCSVZTOLOBCPEGRHQTEMYAWI9HFWEGCPYESMECIGDKZJUSHXZ9FGA9999']

async def _find_transaction(db,mycursor,param,row):
    res = await _aiota.find_transaction_objects(tags = [row[1]])
    print(res)

async def getDb(db,mycursor,param):
    sql_query = "SELECT * FROM %s" % param
    mycursor.execute(sql_query)
    records = mycursor.fetchall()
    tasks = []
    for row in records:
        tasks.append(asyncio.create_task(_find_transaction(db,mycursor,param,row)))
    await asyncio.gather(*tasks)

async def main():
    tasks = [getDb(db,mycursor,'tags')]
    await asyncio.gather(*tasks)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
