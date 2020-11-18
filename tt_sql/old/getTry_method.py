from urllib import request
import json
import asyncio
import aiohttp

class GetTrytes():
    def __init__(self, hashes):

        self.command = json.dumps({
        "command": "getTrytes",
        "hashes": hashes,   
        "requestBatchSize": 1}).encode("utf-8")

        self.headers = {
            'content-type': 'application/json',
            'X-IOTA-API-Version': '1'
        }
        
        self.url = "https://nodes.thetangle.org:443"

        self.req = request.Request(url=self.url, data=self.command, headers=self.headers)


    async def reque(self):
        async with aiohttp.ClientSession(headers=self.headers) as session:
            async with session.post(self.url, data=self.command) as response:

                #print("Status:", response.status)
                #print("Content-type:", response.headers['content-type'])

                return await response.text()
                #print("Body:", html[:100], "...")
            await True
