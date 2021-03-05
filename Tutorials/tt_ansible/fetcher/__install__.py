import json
import os
import subprocess
import asyncio

PATH = os.getcwd()
command = '{}/../TFM13186/bin/python'.format(PATH)
path = "{}/creator.py".format(PATH)

async def main():
    try:
        cron = subprocess.run([command, path])
        print(cron)
    except KeyboardInterrupt:
        pass


loop = asyncio.get_event_loop()
loop.run_until_complete(main())   