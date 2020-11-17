import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="iota_tx_reader2"
)

mycursor=db.cursor()

mycursor.execute("CREATE TABLE user (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100), created datetime, contact varchar(100))")
mycursor.execute("CREATE TABLE addresses (idad int PRIMARY KEY AUTO_INCREMENT, name varchar(90) NOT NULL, created datetime)")
mycursor.execute("CREATE TABLE tags (idta int PRIMARY KEY AUTO_INCREMENT, name varchar(27) NOT NULL, created datetime)")
mycursor.execute("CREATE TABLE hashes (idha int PRIMARY KEY AUTO_INCREMENT, name varchar(81) NOT NULL, idad int NOT NULL, idta int NOT NULL, timestamp varchar(100) NOT NULL)")
mycursor.execute("CREATE TABLE add_connector (idadcon int PRIMARY KEY AUTO_INCREMENT, idcl int NOT NULL, idad int NOT NULL)")
mycursor.execute("CREATE TABLE tag_connector (idtacon int PRIMARY KEY AUTO_INCREMENT, idcl int NOT NULL, idta int NOT NULL)")
mycursor.execute("CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL)")
mycursor.execute("CREATE TABLE raw_objects (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(81) NOT NULL, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL)")

