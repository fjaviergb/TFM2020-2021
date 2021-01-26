FROM python:3
COPY . .

RUN apt-get update
RUN apt-get -y install cron && chmod ugo+x /orders.sh
RUN pip install --no-cache-dir -r requirements.txt

CMD python3 cronpy.py

# # Add crontab file in the cron directory
# ADD crontab /etc/cron.d/hello-cron

# # Give execution rights on the cron job
# RUN chmod 0644 /etc/cron.d/hello-cron
# RUN chmod 0744 /orders.sh

# # Create the log file to be able to run tail
# RUN touch /var/log/cron.log

# #Install Cron
# RUN apt-get update
# RUN apt-get -y install cron && chmod ugo+x /orders.sh
# RUN pip install --no-cache-dir -r requirements.txt

# # Run the command on container startup
# #CMD cron && tail -f /var/log/cron.log
# CMD env > /root/env.txt && cron && tail -f /var/log/cron.log