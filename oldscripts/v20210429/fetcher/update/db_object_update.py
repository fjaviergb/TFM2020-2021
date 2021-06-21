import time
import json
import os
from sqlalchemy import create_engine

PATH = os.path.dirname(os.path.realpath(__file__))

with open("{}/../config.txt".format(PATH)) as f:
  config = json.load(f)

engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                       .format(user=config['user'],
                               pw=config['password'],
                               host=config['host'],
                               db=config['database'],
                               port=config['port']))
connection = engine.connect()

def main(connection):
    # ADDRESSES
        sql_check = "SELECT address \
        FROM transactions \
        WHERE transactions.idad IS NULL \
            GROUP BY address"
        _records = connection.execute(sql_check)
        _records = _records.fetchall()

        sql_search = "SELECT idad, name \
                FROM addresses"
        records = connection.execute(sql_search)
        records = records.fetchall()
        for elem in records:
            if ((elem[1],) in _records):
                print('Updating %s tx'.format(elem[1]))
                sql_update = "UPDATE transactions \
                            SET transactions.idad = %d \
                            WHERE transactions.address = '%s' \
                            AND transactions.idad IS NULL \
                            LIMIT 100000"
                connection.execute(sql_update % (elem[0], elem[1]))

    # TAGS
        sql_check = "SELECT tag \
            FROM transactions \
            WHERE transactions.idta IS NULL \
                GROUP BY tag"
        _records = connection.execute(sql_check)
        _records = _records.fetchall()

        sql_search = "SELECT idta, name \
                FROM tags"
        records = connection.execute(sql_search)
        records = records.fetchall()
        for elem in records:
            if ((elem[1],) in _records):
                print('Updating %s tx' % (elem[1]))
                sql_update = "UPDATE transactions \
                            SET transactions.idta = %d \
                            WHERE transactions.tag = '%s' \
                            AND transactions.idta IS NULL \
                            LIMIT 100000"
                connection.execute(sql_update % (elem[0], elem[1]))

print(time.ctime(time.time()))
main(connection)
connection.close()