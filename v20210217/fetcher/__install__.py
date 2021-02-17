import json
import os
import subprocess
import asyncio

PATH = os.getcwd()
command = '{}/../TFM13186/Scripts/python'.format(PATH)
#command = 'C:\\python\\v3.8.6_MySQL\\Scripts\\python'
path = "{}/creator.py".format(PATH)

async def main():
    try:
        cron = subprocess.run([command, path])
        print(cron)
    except KeyboardInterrupt:
        pass


loop = asyncio.get_event_loop()
loop.run_until_complete(main())   