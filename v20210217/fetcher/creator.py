import mysql.connector
import os
import json

def createTables(mycursor,db):
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
    mycursor.execute("CREATE TABLE transactions (name varchar(81) PRIMARY KEY NOT NULL UNIQUE, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL, idad int, idta int)")
    mycursor.execute("CREATE TABLE tag_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
    mycursor.execute("CREATE TABLE add_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
    mycursor.execute("CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL)")
    mycursor.execute("CREATE TABLE pkeys_adds (idka int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
    mycursor.execute("CREATE TABLE pkeys_tags (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
    mycursor.execute("CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL UNIQUE)")

def saveConfig(config, PATH):
    with open("{}/../config.txt".format(PATH), "w+") as outfile:
        json.dump(config, outfile)

def main(PATH):
    print("¿Desea utilizar un usuario de MySQL ya existente? (y / whatever you write)")
    answer = input()

    if answer == 'y':
        print("Tiene que tener, por lo menos, derecho a SELECT, INSERT, REMOVE Y UPDATE")
        print("Introduzca el host de su estancia Mysql (en caso de ser local --> 'localhost')")
        host = input()
        print("Introduzca el nombre del usuario que desea emplear")
        user = input()
        print("Introduzca la contraseña del usuario que desea emplear")
        pswd = input()
        print("Introduzca el nombre de la base de datos donde desea almacenar la informacion (se creará)")
        database = input()

        config = {
            'host':host,
            'user': user,
            'password': pswd,
            'database': database,
        }

        db = mysql.connector.connect(
            host=host,
            user=user,
            passwd=pswd,
        )

        mycursor = db.cursor()
        mycursor.execute("CREATE DATABASE {}".format(database))

        db = mysql.connector.connect(
            host=host,
            user=user,
            passwd=pswd,
            database=database,
        )

        mycursor = db.cursor()
        createTables(mycursor,db)
        saveConfig(config, PATH)

    else: 
        print("Introduzca el host de su estancia Mysql (en caso de ser local --> 'localhost')")
        host = input()
        print("Introduzca la contraseña de su usuario root")
        rootpswd = input()

        db = mysql.connector.connect(
            host=host,
            user="root",
            passwd=rootpswd,
        )

        mycursor = db.cursor()

        print("Introduzca el nombre del usuario que desea crear")
        user = input()
        print("Introduzca la contraseña del usuario que desea crear")
        pswd = input()

        mycursor.execute("CREATE USER '{}'@'localhost' IDENTIFIED WITH mysql_native_password BY '{}'".format(user, pswd))

        print("Introduzca el nombre de la base de datos donde desea almacenar la informacion")
        database = input()

        mycursor.execute("CREATE DATABASE {}".format(database))
        mycursor.execute("GRANT ALL PRIVILEGES ON {}.* TO '{}'@'localhost'".format(database, user))

        db = mysql.connector.connect(
            host=host,
            user=user,
            passwd=pswd,
            database=database
        )

        mycursor = db.cursor()

        createTables(mycursor,db)

        config = {
            'host':host,
            'user': user,
            'password': pswd,
            'database': database,
        }
        saveConfig(config, PATH)

PATH = os.getcwd()
main(PATH)