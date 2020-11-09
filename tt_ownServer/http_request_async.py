from urllib import request
import json
import asyncio
import aiohttp

class FindTransaction():
    def __init__(self,param,elem):
        self.command = json.dumps({
        "command": "findTransactions",
        "%s" %param: elem,}).encode("utf-8")

        self.headers = {
            'content-type': 'application/json',
            'X-IOTA-API-Version': '1'
        }
        self.url = 'https://nodes.thetangle.org:443'

        self.req = request.Request(url=self.url, data=self.command, headers=self.headers)
    
    async def reque(self, param):
        returnData = request.urlopen(self.req).read()
        jsonData = json.loads(returnData)['hashes']
        print(param + str(len(jsonData)))
        return jsonData

_data = json.dumps({
        "command": "findTransactions",
        "addresses": ["FYYR9AJO9JFSOZMMAUMUITSEQPAEG9DGQEZSLEIP9JIZBRKQQ9TLGGKIOIREPCTLOJ9PS9HEJIRYXFEEZYHPYDAMSD","YP9JEFMZZZWQRB9I9BEVK9MTU9RLQFQYSYUVECCZJOOUSSTZVGGMGAI9JHKCUUGBVBSUHA9ZTJTSGTIXRALPUDMVXD"],}).encode("utf-8")

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

async def fetch(client):
    async with client.post('http://79.159.208.251:80', data=_data, headers=_headers) as resp:
        assert resp.status == 200
        return await resp.text()

async def main():
    async with aiohttp.ClientSession() as client:
        html = await fetch(client)
        print(len(html))

   # tasks = [asyncio.create_task(tx_add1.reque('addresses1')),asyncio.create_task(tx_add2.reque('addresses2'))]

    #await asyncio.gather(*tasks)

tx_add1 = FindTransaction("addresses", ['FYYR9AJO9JFSOZMMAUMUITSEQPAEG9DGQEZSLEIP9JIZBRKQQ9TLGGKIOIREPCTLOJ9PS9HEJIRYXFEEZYHPYDAMSD'])
tx_add2 = FindTransaction("addresses", ['YP9JEFMZZZWQRB9I9BEVK9MTU9RLQFQYSYUVECCZJOOUSSTZVGGMGAI9JHKCUUGBVBSUHA9ZTJTSGTIXRALPUDMVXD'])
asyncio.run(main())