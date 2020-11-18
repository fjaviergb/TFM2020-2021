import asyncio
import time

async def wait(_time):
    print('Done %s... %s' % (_time, time.time()))
    for i in range(1):
        for j in range(1000):
            print(j)
    print('Done %s... %s' % (_time, time.time()))


async def main():
    tasks = [wait(5),wait(2)]
    await asyncio.gather(*tasks)

asyncio.run(main())