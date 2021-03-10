import os
import subprocess
import asyncio

PATH = os.path.dirname(os.path.realpath(__file__))

command = '{}/../TFM13186/bin/python'.format(PATH)

paths = ["{}/update/db_object_remove.py".format(PATH),
"{}/update/http_request_async_tag_file.py".format(PATH),
"{}/update/http_request_async_add_file.py".format(PATH),
"{}/update/db_object_creator.py".format(PATH),
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

print('Do you want to use ("https://nodes.thetangle.org:443") or another node? (y/n)')
ans = input()
if (ans != "y"):
    print("Write the new node")
    server = input()
else:
    server = 'https://nodes.thetangle.org:443'

with open("{}/node.txt".format(PATH), "w+") as text_file:
    text_file.write(server)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())   