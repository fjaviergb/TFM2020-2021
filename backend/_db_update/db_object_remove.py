import mysql.connector
import time

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB2",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

def main(db,mycursor):
    sql_rem_adds = "DELETE FROM TFM_DB2.addresses \
                WHERE idad NOT IN (SELECT idad FROM TFM_DB2.add_names \
                GROUP BY idad)"
    mycursor.execute(sql_rem_adds)
    db.commit()
    sql_update = "UPDATE TFM_DB2.transactions \
            SET transactions.idad = NULL \
            WHERE idad NOT IN (SELECT idad FROM TFM_DB2.add_names \
            GROUP BY idad)"
    mycursor.execute(sql_update)
    db.commit()

    sql_rem_tags = "DELETE FROM TFM_DB2.tags \
            WHERE idta NOT IN (SELECT idta FROM TFM_DB2.tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_rem_tags)
    db.commit()
    sql_update = "UPDATE TFM_DB2.transactions \
            SET transactions.idta = NULL \
            WHERE idta NOT IN (SELECT idta FROM TFM_DB2.tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_update)
    db.commit()

    print('Addresses & Tags removed succesfully')

print(time.ctime(time.time()))
main(db,mycursor)   