import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB"
)

mycursor=db.cursor()

mycursor.execute("CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE)")
mycursor.execute("CREATE TABLE addresses (idad int PRIMARY KEY AUTO_INCREMENT, name varchar(90) NOT NULL UNIQUE, created datetime)")
mycursor.execute("CREATE TABLE tags (idta int PRIMARY KEY AUTO_INCREMENT, name varchar(27) NOT NULL UNIQUE, created datetime)")
mycursor.execute("CREATE TABLE pkeys (idke int PRIMARY KEY AUTO_INCREMENT, name varchar(384) NOT NULL UNIQUE, created datetime)")
# DEP mycursor.execute("CREATE TABLE hashes (idha int PRIMARY KEY AUTO_INCREMENT, name varchar(81) NOT NULL, idad int NOT NULL, idta int NOT NULL, timestamp varchar(100) NOT NULL)")
# DEP mycursor.execute("CREATE TABLE add_connector (idadcon int PRIMARY KEY AUTO_INCREMENT, idcl int NOT NULL, idad int NOT NULL)")
# DEP mycursor.execute("CREATE TABLE tag_connector (idtacon int PRIMARY KEY AUTO_INCREMENT, idcl int NOT NULL, idta int NOT NULL)")
mycursor.execute("CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL UNIQUE)")
mycursor.execute("CREATE TABLE temp_table (name varchar(81))")
# DEP mycursor.execute("CREATE TABLE raw_objects (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(81) NOT NULL, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL)")
mycursor.execute("CREATE TABLE transactions (name varchar(81) PRIMARY KEY NOT NULL UNIQUE, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL, idad int, idta int)")
mycursor.execute("CREATE TABLE tag_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
mycursor.execute("CREATE TABLE add_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
mycursor.execute("CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL)")
mycursor.execute("CREATE TABLE pkeys_adds (idka int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
mycursor.execute("CREATE TABLE pkeys_tags (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idta int NOT NULL)")

#mycursor.execute("DROP TABLE pkeys_tags")
