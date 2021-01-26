from crontab import CronTab
import os

print(os.environ['HOME'])
cron = CronTab(user=None)
job = cron.new(command='echo Hola Mundo')
job.minute.every(1)
cron.write()
