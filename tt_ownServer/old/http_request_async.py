from urllib import request
import json
import asyncio
import aiohttp
import mysql.connector

_midAdd = "UQZWLO9RDMPICQMIEZRVIQYNYXXMBQLFEBEHDKVPC9RXHZP9WFAASOIBULPHYZCAKVO9FEIPYPQEBQCEYXMFFMABOX"
_lowAdd = "YP9JEFMZZZWQRB9I9BEVK9MTU9RLQFQYSYUVECCZJOOUSSTZVGGMGAI9JHKCUUGBVBSUHA9ZTJTSGTIXRALPUDMVXD"
_hugeAdd = "FYYR9AJO9JFSOZMMAUMUITSEQPAEG9DGQEZSLEIP9JIZBRKQQ9TLGGKIOIREPCTLOJ9PS9HEJIRYXFEEZYHPYDAMSD"

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
        assert resp.status == 200
        return await resp.text()

async def _client(_key,row):
    async with aiohttp.ClientSession() as client:
        html = await fetch(client,_key,row)
        print(len(json.loads(html)['hashes']))

#_addresses = [_hugeAdd,_lowAdd,_midAdd]
async def main(db,mycursor,_key):
    sql_query = "SELECT * FROM %s" % _key
    mycursor.execute(sql_query)
    records = mycursor.fetchall()
    tasks=[]
    for row in records:
        tasks.append(asyncio.create_task(_client(_key,row)))
    await asyncio.gather(*tasks)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)
mycursor = db.cursor(buffered=True)

loop = asyncio.get_event_loop()
loop.run_until_complete(main(db,mycursor,'tags'))