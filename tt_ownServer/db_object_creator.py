from configparser import Error
from urllib import request
import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime
from iota import Transaction,TryteString

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


def _getTrytes(db,mycursor,elem):
    _data = json.dumps({
            "command": "getTrytes",
            "hashes": [elem[0]]
            }).encode("utf-8")
    req = request.Request(url=_local, data=_data, headers=_headers)
    returnData = request.urlopen(req).read()
    return json.loads(returnData)['trytes'][0]

async def main(db,mycursor):
    sql_join = "SELECT DISTINCT temp_hashes.name \
                FROM temp_hashes \
                WHERE temp_hashes.name \
                NOT IN (SELECT raw_objects.name FROM raw_objects);"
    mycursor.execute(sql_join)
    records = mycursor.fetchall()
    print(len(records))
    for elem in records:
        if len(elem[0]) != 81:
            pass
        else:
            _hash_query = _getTrytes(db,mycursor,elem)
            _transaction = Transaction.from_tryte_string(_hash_query)
            #print(type(_transaction.timestamp),type(_transaction.address),type(_transaction.tag),type(_hash_query))
            sql_query= "INSERT INTO raw_objects (name,timestamp,address,tag,trytes) VALUES (%s,%s,%s,%s,%s)"
            mycursor.execute(sql_query, (elem[0],_transaction.timestamp,str(_transaction.address),str(_transaction.tag),_hash_query))
            db.commit()

loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor))    



