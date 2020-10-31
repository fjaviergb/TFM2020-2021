from iota import AsyncIota, Iota
import asyncio

_provider = "https://nodes.thetangle.org:443"
_address = ['CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ']
_tag = ['HORNET99INTEGRATED99999A9VO']

_aiota = AsyncIota(_provider)
_iota = Iota(_provider)

async def main():
    res = await _aiota.find_transaction_objects(tags = _tag)
    print(res)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())

