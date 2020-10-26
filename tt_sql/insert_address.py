import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)

mycursor = db.cursor(buffered=True)

# Simulamos que el cliente 1 - Javier González, introduce nuevas addresses
idcl = 2
address = 'CORONAMINUSAUSSCHUSSPUNKTDE9SPAMMER9999999999999999999999999999999999999999999999NNSPPHCJZ'

def query_to_addtable (db, idcl, address):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("INSERT INTO addresses (name,created) VALUES (%s,%s)", (address,datetime.now()))
    db.commit()

def check_addtable (db, address):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT * FROM addresses WHERE name = %s", (address,))
    return mycursor.fetchmany(1)

def check_connector(db,idcl,address):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT * FROM addresses WHERE name = %s", (address,))
    idad = mycursor.fetchmany(1)[0][0]

    mycursor.execute("SELECT * FROM add_connector WHERE idcl = %s AND idad = %s", (idcl,idad))
    return mycursor.fetchmany(1)


def query_to_addconntable(db,idcl,address):
    mycursor = db.cursor(buffered=True)
    mycursor.execute("SELECT idad FROM addresses WHERE name = %s", (address,))
    records = mycursor.fetchmany(1)
    mycursor.execute("INSERT INTO add_connector (idcl,idad) \
                                VALUES (%s,%s)", (idcl,records[0][0]))
    db.commit()

# Tres pasos
# 1. Comprobar si ya se encuentra registrada esa address 
add_recorded = check_addtable(db,address)
conn_recorded = check_connector(db,idcl,address)

# 2. Si no se encuentra, hacer una query sobre tabla ADDRESSES y otra sobre ADD_CONN
if len(add_recorded) == 0:
    query_to_addtable(db,idcl,address)

# 3. Hacer una query sobre tabla ADD_CONN
if len(conn_recorded) == 0:
    query_to_addconntable(db,idcl,address)
