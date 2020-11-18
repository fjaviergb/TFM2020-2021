from iota import AsyncIota, Iota
import asyncio

_url = "https://nodes.thetangle.org:443"
_local = 'http://192.168.1.33:14265'
_address = ['CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ']
_tag = ['HORNET99INTEGRATED99999A9VO']

_aiota = AsyncIota(_local)
_iota = Iota(_local)

async def main():
    res = await _aiota.find_transaction_objects(tags = _tag)
    print(res['transactions'][0].tag)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())

