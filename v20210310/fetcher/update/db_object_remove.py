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
    sql_rem_adds = "DELETE FROM addresses \
                WHERE idad NOT IN (SELECT idad FROM add_names \
                GROUP BY idad)"
    connection.execute(sql_rem_adds)

    sql_update = "UPDATE transactions \
            SET transactions.idad = NULL \
            WHERE idad NOT IN (SELECT idad FROM add_names \
            GROUP BY idad)"
    connection.execute(sql_update)


    sql_rem_tags = "DELETE FROM tags \
            WHERE idta NOT IN (SELECT idta FROM tag_names \
            GROUP BY idta)"
    connection.execute(sql_rem_tags)

    sql_update = "UPDATE transactions \
            SET transactions.idta = NULL \
            WHERE idta NOT IN (SELECT idta FROM tag_names \
            GROUP BY idta)"
    connection.execute(sql_update)

    print('Addresses & Tags removed succesfully')

print(time.ctime(time.time()))
main(connection)   
connection.close()