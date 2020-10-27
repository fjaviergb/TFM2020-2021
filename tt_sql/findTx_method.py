from urllib import request
import json
import asyncio

class FindTransaction():
  def __init__(self,param,elem):
    self.command = json.dumps({
      "command": "findTransactions",
      "%s" %param: 
        elem,
    }).encode("utf-8")

    self.headers = {
        'content-type': 'application/json',
        'X-IOTA-API-Version': '1'
    }

    self.req = request.Request(url="https://nodes.thetangle.org:443", data=self.command, headers=self.headers)
    
  # def request(self):
  #   req = request.Request(url="https://nodes.thetangle.org:443", data=self.command, headers=self.headers)
  #   returnData = request.urlopen(req).read()
  #   jsonData = json.loads(returnData)
  #   return jsonData
  async def reque(self, param):
    loop = asyncio.get_event_loop()
    returnData = loop.run_in_executor(None, request.urlopen, (self.req))
    response = await returnData
    print('Done %s', param)
    jsonData = json.loads(response.read())
    return jsonData