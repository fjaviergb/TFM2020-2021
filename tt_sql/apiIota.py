from iota import AsyncIota
import asyncio

settings = {
    'provider': "https://nodes.thetangle.org:443"
}

_iota = AsyncIota("https://nodes.thetangle.org:443")


_address = ['CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ']
_tag = ['MY9MAM999999999999999999999']

async def wait(loop):
    res = await _iota.find_transactions(tags = _tag)
    print(len(res['hashes']))


loop = asyncio.get_event_loop()
loop.run_until_complete(wait(loop))

