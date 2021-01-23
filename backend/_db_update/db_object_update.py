import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

def main(db,mycursor):
    # ADDRESSES
        sql_check = "SELECT address \
        FROM TFM_DB.transactions \
        WHERE transactions.idad IS NULL \
            GROUP BY address"
        mycursor.execute(sql_check)
        _records = mycursor.fetchall()

        sql_search = "SELECT idad, name \
                FROM TFM_DB.addresses"
        mycursor.execute(sql_search)
        records = mycursor.fetchall()
        for elem in records:
            if ((elem[1],) in _records):
                print('Updating %s tx'.format(elem[1]))
                sql_update = "UPDATE TFM_DB.transactions \
                            SET transactions.idad = %d \
                            WHERE transactions.address = '%s' \
                            AND transactions.idad IS NULL \
                            LIMIT 100000"
                mycursor.execute(sql_update % (elem[0], elem[1]))
                db.commit()

    # TAGS
        sql_check = "SELECT tag \
            FROM TFM_DB.transactions \
            WHERE transactions.idta IS NULL \
                GROUP BY tag"
        mycursor.execute(sql_check)
        _records = mycursor.fetchall()

        sql_search = "SELECT idta, name \
                FROM TFM_DB.tags"
        mycursor.execute(sql_search)
        records = mycursor.fetchall()
        for elem in records:
            if ((elem[1],) in _records):
                print('Updating %s tx' % (elem[1]))
                sql_update = "UPDATE TFM_DB.transactions \
                            SET transactions.idta = %d \
                            WHERE transactions.tag = '%s' \
                            AND transactions.idta IS NULL \
                            LIMIT 100000"
                mycursor.execute(sql_update % (elem[0], elem[1]))
                db.commit()
  
main(db,mycursor)