import asyncio
import findTx_method as iota
from urllib import request
import json

#   async def request(self, param):
#     req = request.Request(url="https://nodes.thetangle.org:443", data=self.command, headers=self.headers)
#     returnData = request.urlopen(req).read()
#     print('Done %s', param)
#     jsonData = json.loads(returnData)
#     return jsonData

async def main():
    tx_add1 = iota.FindTransaction("addresses", ['9FNJWLMBECSQDKHQAGDHDPXBMZFMQIMAFAUIQTDECJVGKJBKHLEBVU9TWCTPRJGYORFDSYENIQKBVSYKW9NSLGS9UW'])
    tx_add2 = iota.FindTransaction("addresses", ['CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ','CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ'])
    tx_tag = iota.FindTransaction("tags", ['CORONAMINUSAUSSCHUSS99QISHV'])

    tasks = [asyncio.create_task(tx_add1.reque('addresses1')),asyncio.create_task(tx_add2.reque('addresses')),asyncio.create_task(tx_tag.reque('tags'))]

    await asyncio.gather(*tasks)

asyncio.run(main())