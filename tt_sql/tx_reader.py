import asyncio
import mysql.connector
from datetime import datetime
import findTx_method as iota

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)

mycursor = db.cursor(buffered=True)

async def check_param(db,mycursor,param,row):
    transaction = iota.FindTransaction(param,row[1])
    print(transaction.request())

async def getDb(db,mycursor,param):
    sql_query = "SELECT * FROM %s" % param
    mycursor.execute(sql_query)
    records = mycursor.fetchall()
    tasks = []
    for row in records:
        tasks.append(asyncio.create_task(check_param(db,mycursor,param,row)))
    await asyncio.gather(*tasks)

async def main():
    tasks = [getDb(db,mycursor,'addresses'),getDb(db,mycursor,'tags')]
    await asyncio.gather(*tasks)

asyncio.run(main())




