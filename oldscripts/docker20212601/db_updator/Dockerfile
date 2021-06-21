FROM python:3
COPY . .

RUN apt-get update
RUN apt-get -y install cron && chmod ugo+x /orders.sh
RUN pip install --no-cache-dir -r requirements.txt


