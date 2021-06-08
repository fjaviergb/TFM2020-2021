FROM mysql:5.7.17

MAINTAINER ...

ENV MYSQL_ROOT_PASSWORD=13186
ENV MYSQL_DATABASE=TFM13186   

COPY CreateDB.sql /docker-entrypoint-initdb.d/

RUN apt-get install mysql-client

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
