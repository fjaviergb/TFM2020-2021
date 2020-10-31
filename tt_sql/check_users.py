import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)

mycursor=db.cursor()

mycursor.execute("SELECT * FROM user")

for elem in mycursor:  
    print(elem)