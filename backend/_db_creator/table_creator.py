import mysql.connector
from datetime import datetime
import config as NAME

db = mysql.connector.connect(
    host=NAME.HOST,
    user=NAME.USER,
    passwd=NAME.PASSWORD,
    database=NAME.DATABASE
)

mycursor=db.cursor()

mycursor.execute("CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE)")
mycursor.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_CONTACT CHECK (CHAR_LENGTH(contact) >= 3)")
mycursor.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_NAME CHECK (CHAR_LENGTH(name) >= 3)")
mycursor.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_PSWD CHECK (CHAR_LENGTH(password) >= 3)")
mycursor.execute("CREATE TABLE addresses (idad int PRIMARY KEY AUTO_INCREMENT, name varchar(90) NOT NULL UNIQUE, created datetime)")
mycursor.execute("ALTER TABLE addresses ADD CONSTRAINT MINIMO_ADD CHECK (CHAR_LENGTH(name) = 81)")
mycursor.execute("CREATE TABLE tags (idta int PRIMARY KEY AUTO_INCREMENT, name varchar(27) NOT NULL UNIQUE, created datetime)")
mycursor.execute("ALTER TABLE tags ADD CONSTRAINT MINIMO_TAG CHECK (CHAR_LENGTH(name) = 27)")
mycursor.execute("CREATE TABLE pkeys (idke int PRIMARY KEY AUTO_INCREMENT, name varchar(384) NOT NULL UNIQUE, created datetime)")
mycursor.execute("CREATE TABLE temp_table (name varchar(81))")
mycursor.execute("CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL UNIQUE)")
mycursor.execute("CREATE TABLE transactions (name varchar(81) PRIMARY KEY NOT NULL UNIQUE, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL, idad int, idta int)")
mycursor.execute("CREATE TABLE tag_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
mycursor.execute("CREATE TABLE add_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
mycursor.execute("CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL)")
mycursor.execute("CREATE TABLE pkeys_adds (idka int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
mycursor.execute("CREATE TABLE pkeys_tags (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idta int NOT NULL)")

