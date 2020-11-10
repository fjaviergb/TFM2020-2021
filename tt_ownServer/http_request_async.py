from urllib import request
import json
import asyncio
import aiohttp

_midAdd = "UQZWLO9RDMPICQMIEZRVIQYNYXXMBQLFEBEHDKVPC9RXHZP9WFAASOIBULPHYZCAKVO9FEIPYPQEBQCEYXMFFMABOX"
_lowAdd = "YP9JEFMZZZWQRB9I9BEVK9MTU9RLQFQYSYUVECCZJOOUSSTZVGGMGAI9JHKCUUGBVBSUHA9ZTJTSGTIXRALPUDMVXD"
_hugeAdd = "FYYR9AJO9JFSOZMMAUMUITSEQPAEG9DGQEZSLEIP9JIZBRKQQ9TLGGKIOIREPCTLOJ9PS9HEJIRYXFEEZYHPYDAMSD"

_data = json.dumps({
        "command": "findTransactions",
        "addresses": [_lowAdd,_midAdd]
        }).encode("utf-8")

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_local = 'http://79.159.208.251:80'
_url = 'https://nodes.thetangle.org:443'

async def fetch(client):
    async with client.post(_url, data=_data, headers=_headers) as resp:
        assert resp.status == 200
        return await resp.text()

async def main():
    async with aiohttp.ClientSession() as client:
        html = await fetch(client)
        print(len(json.loads(html)['hashes']))

loop = asyncio.get_event_loop()
loop.run_until_complete(main())