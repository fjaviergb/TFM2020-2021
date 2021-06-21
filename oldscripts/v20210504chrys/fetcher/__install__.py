import os
import subprocess
import asyncio
import sys

PATH = os.path.dirname(os.path.realpath(__file__))
command = '{}/../TFM13186/bin/python'.format(PATH)
path = "{}/creator.py".format(PATH)
_args = sys.argv

async def main():
    try:
        cron = subprocess.run([command, path, _args[1], _args[2], _args[3], _args[4], _args[5], _args[6], _args[7]])           
        print(cron)
    except KeyboardInterrupt:
        pass

loop = asyncio.get_event_loop()
loop.run_until_complete(main())   