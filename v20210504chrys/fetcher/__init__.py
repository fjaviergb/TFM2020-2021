import os
import subprocess
import asyncio

PATH = os.path.dirname(os.path.realpath(__file__))

command = '{}/../TFM13186/bin/python'.format(PATH)

paths = ["{}/update/db_object_remove.py".format(PATH),
"{}/update/db_object_request.py".format(PATH),
"{}/update/db_object_update.py".format(PATH)]

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