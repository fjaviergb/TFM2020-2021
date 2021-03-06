from urllib import request
import json
import asyncio
import aiohttp
#Version 2/3
from iota import Iota, AsyncIota

class FindTransaction():
  def __init__(self,param,elem):
    self.command = json.dumps({
      "command": "findTransactions",
      "%s" %param: elem,
      "requestBatchSize": 1}).encode("utf-8")

    self.headers = {
        'content-type': 'application/json',
        'X-IOTA-API-Version': '1'
    }
    self.url = "https://nodes.thetangle.org:443"

    self.req = request.Request(url=self.url, data=self.command, headers=self.headers)

    #Version 2
    self._iota = Iota(self.url)
    self.param = param
    self.elem = elem

    #Version 3
    self._asynciota = AsyncIota(self.url)

#Version 1
  async def reque(self):      
    async with aiohttp.ClientSession(headers=self.headers) as session:
        async with session.post(self.url, data=self.command) as response:
            return await response.text()
        await True

#Version 2
  async def reques(self):
    return await self._iota.find_transaction_objects(tags = self.elem)

  #Versión 3
  async def areques(self):
    return await self._asynciota.find_transaction_objects(tags = self.elem)

# PRUEBA ASYNCIO PARA pruebasync.py
  # async def reque(self, param):
  #   loop = asyncio.get_event_loop()
  #   returnData = loop.run_in_executor(None, request.urlopen, (self.req))
  #   response = await returnData
  #   print('Done %s', param)
  #   jsonData = json.loads(response.read())
  #   return jsonData