import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader"
)

mycursor=db.cursor()

mycursor.execute("INSERT INTO user (name, created, contact) VALUES (%s,%s,%s)", ('Nacho',datetime.now(),'nachogon92@gmail.com'))

db.commit()