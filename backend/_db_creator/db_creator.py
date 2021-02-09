import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
)

mycursor = db.cursor()
mycursor.execute('CREATE DATABASE TFM_DB2')