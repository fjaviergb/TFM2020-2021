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
    sql_rem_ident = "DELETE FROM identifiers \
            WHERE idid NOT IN (SELECT idid FROM ident_names \
            GROUP BY idid)"
    connection.execute(sql_rem_ident)

    sql_update = "UPDATE messages \
            SET messages.idid = NULL \
            WHERE idid NOT IN (SELECT idid FROM ident_names \
            GROUP BY idid)"
    connection.execute(sql_update)

    print('Identifiers removed succesfully')

print(time.ctime(time.time()))
main(connection)   
connection.close()