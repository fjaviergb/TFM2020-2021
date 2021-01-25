import mysql.connector
import pymysql

db = pymysql.connect(
    host="database",
    user="root",
    port=3306,
    passwd="13186",
    database="TFM_DB",
)
mycursor = db.cursor()

def main(db,mycursor):
    sql_rem_adds = "DELETE FROM TFM_DB.addresses \
                WHERE idad NOT IN (SELECT idad FROM TFM_DB.add_names \
                GROUP BY idad)"
    mycursor.execute(sql_rem_adds)
    db.commit()

    sql_rem_tags = "DELETE FROM TFM_DB.tags \
            WHERE idta NOT IN (SELECT idta FROM TFM_DB.tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_rem_tags)
    db.commit()

    print('Addresses & Tags removed succesfully')

main(db,mycursor)   