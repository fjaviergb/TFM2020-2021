from configparser import Error
from urllib import request
import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime
from iota import Transaction,TryteString
import csv
import pandas as pd
from iota.trits import int_from_trits


db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader2",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'http://192.168.1.33:14265'
_url = 'https://nodes.thetangle.org:443'


async def fetch(client,elem):
    _data = json.dumps({
            "command": "getTrytes",
            "hashes": elem
            }).encode("utf-8")
    # req = request.Request(url=_local, data=_data, headers=_headers)
    # returnData = request.urlopen(req).read()
    # return json.loads(returnData)['trytes']
    async with client.post(_local, data=_data, headers=_headers) as resp:
        #assert resp.status == 200
        return await resp.text()

async def _transaction(_list,spamwriter,df):
    df['Trytes']=_list
    df[['Timestamp','Address','Tag']]=list(map(lambda x: [int_from_trits(TryteString(x[2322:2331]).as_trits()),x[2187:2268],x[2592:2619]], _list))
    #df['Timestamp'] = df['Timestamp'].apply()
    print(df)

async def _client(db,mycursor,records_mapped,spamwriter):
    df = pd.DataFrame(columns=['Hash','Trytes','Timestamp','Address','Tag'])
    df['Hash'] = records_mapped
    async with aiohttp.ClientSession() as client:
            html = await fetch(client,records_mapped)
            try:
                print('Receiving... %s' % len(json.loads(html)['trytes']))
                await asyncio.create_task(_transaction(json.loads(html)['trytes'],spamwriter,df))
            except KeyError:
                print("Empty; incomplete; etc")

async def main(db,mycursor):

    with open("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\iota_tx_reader2\\temp_raw.csv", 'w+', newline='') as csvfile:
        spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)

        sql_join = "SELECT DISTINCT temp_hashes.name \
                    FROM temp_hashes \
                    WHERE temp_hashes.name \
                    NOT IN (SELECT raw_objects.name FROM raw_objects);"
        mycursor.execute(sql_join)

        #num_iter = math.ceil(len(records) / 1000)
        records = [1]
        tasks=[]
        while len(records) > 0:

            records = mycursor.fetchmany(10000)
            print('Sending... %s' % len(records))
            records_filtered = filter(lambda x: len(x[0])==81, records)
            records_mapped = list(map(lambda x: x[0], records_filtered))
            tasks.append(asyncio.create_task(_client(db,mycursor,records_mapped,spamwriter)))
            await asyncio.sleep(30)

        await asyncio.gather(*tasks)
    

    # with open("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\iota_tx_reader2\\temp_raw.csv", 'w+', newline='') as csvfile:
    #     spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    #     for elem in records:
    #         if len(elem[0]) != 81:
    #             pass
    #         else:
    #             _transaction = Transaction.from_tryte_string(_hash_query)
    #             #print(type(_transaction.timestamp),type(_transaction.address),type(_transaction.tag),type(_hash_query))

    #             spamwriter.writerow([elem[0],_transaction.timestamp,str(_transaction.address),str(_transaction.tag),_hash_query])

    #             #sql_query= "INSERT INTO raw_objects (name,timestamp,address,tag,trytes) VALUES (%s,%s,%s,%s,%s)"
    #             #mycursor.execute(sql_query, (elem[0],_transaction.timestamp,str(_transaction.address),str(_transaction.tag),_hash_query))


loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor))    



