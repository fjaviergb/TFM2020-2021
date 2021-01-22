import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user='root',
    passwd='PutosRusosSQL13186',
    database="iota_tx_reader2"
)
mycursor = db.cursor(buffered=True)

def check_tagtable(db, tag):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT * FROM tags WHERE name = %s", (tag,))
    return mycursor.fetchmany(1)

def check_connector(db, idcl, tag):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT * FROM tags WHERE name = %s", (tag,))
    records = mycursor.fetchmany(1)
    mycursor.execute("SELECT * FROM tag_connector WHERE idcl = %s AND idta = %s", (idcl,records[0][0]))
    return mycursor.fetchmany(1)

def query_to_tagtable(db, idcl, tag):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("INSERT INTO tags (name, created) VALUES (%s, %s)", (tag, datetime.now()))
    db.commit()

def query_to_tagconntable(db, idcl, tag):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT * FROM tags WHERE name = %s", (tag,))
    records = mycursor.fetchmany(1)
    mycursor.execute("INSERT INTO tag_connector (idcl, idta) VALUES (%s,%s)", (idcl,records[0][0]))
    db.commit()

# Mismo proceso que insertar direcciones
# Simulamos que el cliente 1 - Javier González, introduce nuevas addresses
idcl = 1
tag = 'MINEIOTADOTCOM9999999999999'

# 1. Comprobamos si se encuentra en tabla TAGS
tag_recorded = check_tagtable(db,tag)


# 2. Si no se encuentra, la añadimos a la tabla TAGS
if len(tag_recorded) == 0:
    query_to_tagtable(db,idcl,tag)

# 3. Comprobamos si se encuentra en tabla TAG_CONNECTOR
conn_recorded = check_connector(db,idcl,tag)

# 4. Se comprueba si el tag ya ha sido añadido para el cliente
if len(conn_recorded) == 0:
    query_to_tagconntable(db,idcl,tag)




