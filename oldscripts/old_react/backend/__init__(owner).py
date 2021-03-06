import os
import subprocess
import asyncio

PATH = os.path.dirname(__file__)
command = 'C:\\python\\v3.8.6_MySQL\\Scripts\\python'

paths = ["{}/_db_update/db_object_remove.py".format(PATH),
"{}/_db_update/http_request_async_tag_file.py".format(PATH),
"{}/_db_update/http_request_async_add_file.py".format(PATH),
"{}/_db_update/db_object_creator.py".format(PATH),
"{}/_db_update/db_object_update.py".format(PATH)]

async def chrono ():
    print('Refreshing')
    await asyncio.sleep(60)

async def exec():
    for script in paths:
        cron = subprocess.run([command, script], capture_output=True)
        with open("{}/output.txt".format(PATH), "a") as text_file:
            text_file.write('{}\n'.format(cron))

async def main():
    while True:
        try:
            tasks = []
            tasks.append(asyncio.create_task(chrono()))
            tasks.append(asyncio.create_task(exec()))
            await asyncio.gather(*tasks)
        except KeyboardInterrupt:
            break

loop = asyncio.get_event_loop()
loop.run_until_complete(main())   