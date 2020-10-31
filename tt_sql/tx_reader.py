import asyncio
import mysql.connector
from datetime import datetime
import findTx_method as iota
import getTry_method as iota2
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)

mycursor = db.cursor(buffered=True)

async def check_trytes(db,mycursor,param,row,data):
    #Request por cada elemento de la lista
    # tasks = []
    # for _hash in task.result()['hashes']:
    #     trytes = iota2.GetTrytes([_hash])
    #     tasks.append(asyncio.create_task(trytes.reque()))
    # await asyncio.gather(*tasks)
    # print(tasks)
    # Request con todo en una lista

    trytes_list = iota2.GetTrytes(data)
    task = asyncio.create_task(trytes_list.reque())
    await task
    print(task.result())

async def check_param(db,mycursor,param,row):
    sql_query = "SELECT * FROM %s" % param
    hashes_list = iota.FindTransaction(param,[row[1]])

    #Version 1
    task = asyncio.create_task(hashes_list.reque())
    await task
    data = json.loads(task.result())['hashes']
    print(data)
    await asyncio.create_task(check_trytes(db,mycursor,param,row,data))

    #Version 2
    # task = asyncio.create_task(hashes_list.reques())
    # await task
    # print(len(task.result()['transactions']))
    # for elem in task.result()['transactions']:
    #     print(elem.hash)

async def getDb(db,mycursor,param):
    sql_query = "SELECT * FROM %s" % param
    mycursor.execute(sql_query)
    records = mycursor.fetchall()
    tasks = []
    for row in records:
        tasks.append(asyncio.create_task(check_param(db,mycursor,param,row)))
    await asyncio.gather(*tasks)

async def main():
    tasks = [getDb(db,mycursor,'tags')]
    await asyncio.gather(*tasks)

asyncio.run(main())




