import os
import subprocess
import asyncio
import config as NAME

PATH = os.path.dirname(__file__)
command = 'C:\\python\\v3.8.6_MySQL\\Scripts\\python'
#command = '{}/TFM13186/Scripts/python'.format(PATH)

paths = ["{}/db_object_remove.py".format(PATH),
"{}/http_request_async_tag_file.py".format(PATH),
"{}/http_request_async_add_file.py".format(PATH),
"{}/db_object_creator.py".format(PATH),
"{}/db_object_update.py".format(PATH)]

async def chrono ():
    print('called')
    await asyncio.sleep(NAME.TIME_IN_BETWEEN)

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