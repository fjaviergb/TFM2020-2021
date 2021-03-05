import mysql.connector
import os
import json
from sqlalchemy import create_engine

def createTables(connection):
    connection.execute("CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_CONTACT CHECK (CHAR_LENGTH(contact) >= 3)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_NAME CHECK (CHAR_LENGTH(name) >= 3)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_PSWD CHECK (CHAR_LENGTH(password) >= 3)")
    connection.execute("CREATE TABLE addresses (idad int PRIMARY KEY AUTO_INCREMENT, name varchar(90) NOT NULL UNIQUE, created datetime)")
    connection.execute("ALTER TABLE addresses ADD CONSTRAINT MINIMO_ADD CHECK (CHAR_LENGTH(name) = 81)")
    connection.execute("CREATE TABLE tags (idta int PRIMARY KEY AUTO_INCREMENT, name varchar(27) NOT NULL UNIQUE, created datetime)")
    connection.execute("ALTER TABLE tags ADD CONSTRAINT MINIMO_TAG CHECK (CHAR_LENGTH(name) = 27)")
    connection.execute("CREATE TABLE pkeys (idke int PRIMARY KEY AUTO_INCREMENT, name varchar(384) NOT NULL UNIQUE, created datetime)")
    connection.execute("CREATE TABLE temp_table (name varchar(81))")
    connection.execute("CREATE TABLE transactions (name varchar(81) PRIMARY KEY NOT NULL UNIQUE, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL, idad int, idta int)")
    connection.execute("CREATE TABLE tag_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
    connection.execute("CREATE TABLE add_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
    connection.execute("CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL)")
    connection.execute("CREATE TABLE pkeys_adds (idka int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idad int NOT NULL)")
    connection.execute("CREATE TABLE pkeys_tags (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idta int NOT NULL)")
    connection.execute("CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL UNIQUE)")
    connection.close()

def saveConfig(config, PATH):
    with open("{}/../config.txt".format(PATH), "w+") as outfile:
        json.dump(config, outfile)

def main(PATH):
    print("¿Desea utilizar un usuario de MySQL ya existente? (y / whatever you write)")
    answer = input()

    if answer == 'y':
        print("Tiene que tener, por lo menos, derecho a SELECT, INSERT, REMOVE Y UPDATE \
            y además tanto en localhost como en %")
        print("Introduzca el host de su estancia Mysql (en caso de ser local --> 'localhost')")
        host = input()
        print("Introduzca el puerto de su estancia Mysql/MariaDB (en caso de ser el predeterminado --> 3306)")
        port = input()
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
            'port':port
        }

        engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}"
                            .format(user=config['user'],
                                    pw=config['password'],
                                    host=config['host'],
                                    port=config['port']))

        connection = engine.connect()
        connection.execute("CREATE DATABASE {}".format(database))
        connection.close()

        engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                                            .format(user=config['user'],
                                                    pw=config['password'],
                                                    host=config['host'],
                                                    port=config['port'],
                                                    db=database))

        connection = engine.connect()
        createTables(connection)
        saveConfig(config, PATH)

    else: 
        print("Introduzca el host de su root Mysql/MariaDb (en caso de ser local --> 'localhost') \
            Debe tener acceso local y de fuera % (MySQL tiene muchas restricciones con su root)")
        host = input()
        print("Introduzca el puerto de su estancia Mysql/MariaDB (en caso de ser el predeterminado --> 3306)")
        port = input()
        print("Introduzca la contraseña de su usuario root")
        rootpswd = input()

        engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}"
                            .format(user='root',
                                    pw=rootpswd,
                                    host=host,
                                    port=port))
        # mycursor = db.cursor()
        connection = engine.connect()
        print("Introduzca el nombre del usuario que desea crear")
        user = input()
        print("Introduzca la contraseña del usuario que desea crear")
        pswd = input()

        connection.execute("CREATE USER '{}'@'localhost' IDENTIFIED BY '{}'".format(user, pswd))
        connection.execute("CREATE USER '{}'@'%%' IDENTIFIED BY '{}'".format(user, pswd))
        connection.execute("GRANT ALL PRIVILEGES ON *.* TO '{}'@'localhost'".format(user))
        connection.execute("GRANT ALL PRIVILEGES ON *.* TO '{}'@'%%'".format(user))

        print("Introduzca el nombre de la base de datos donde desea almacenar la informacion")
        database = input()

        connection.execute("CREATE DATABASE {}".format(database))
        connection.execute("GRANT ALL PRIVILEGES ON {}.* TO '{}'@'localhost'".format(database,user))
        connection.execute("GRANT ALL PRIVILEGES ON {}.* TO '{}'@'%%'".format(database,user))
        connection.close()

        engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                            .format(user='root',
                                    pw=rootpswd,
                                    host=host,
                                    port=port,
                                    db=database))

        connection = engine.connect()
        createTables(connection)

        config = {
            'host':host,
            'port':port,
            'user': user,
            'password': pswd,
            'database': database,
        }
        saveConfig(config, PATH)

PATH = os.getcwd()
main(PATH)