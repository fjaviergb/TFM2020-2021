import mysql.connector
import time
import json
import os

PATH = os.getcwd()

with open("{}/config.txt".format(PATH)) as f:
  config = json.load(f)
  
db = mysql.connector.connect(
    host= config['host'],
    user= config['user'],
    passwd= config['password'],
    database= config['database'],
    allow_local_infile=True
)

mycursor = db.cursor(buffered=True)

def main(db,mycursor):
    sql_rem_adds = "DELETE FROM addresses \
                WHERE idad NOT IN (SELECT idad FROM add_names \
                GROUP BY idad)"
    mycursor.execute(sql_rem_adds)
    db.commit()
    sql_update = "UPDATE transactions \
            SET transactions.idad = NULL \
            WHERE idad NOT IN (SELECT idad FROM add_names \
            GROUP BY idad)"
    mycursor.execute(sql_update)
    db.commit()

    sql_rem_tags = "DELETE FROM tags \
            WHERE idta NOT IN (SELECT idta FROM tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_rem_tags)
    db.commit()
    sql_update = "UPDATE transactions \
            SET transactions.idta = NULL \
            WHERE idta NOT IN (SELECT idta FROM tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_update)
    db.commit()

    print('Addresses & Tags removed succesfully')

print(time.ctime(time.time()))
main(db,mycursor)   