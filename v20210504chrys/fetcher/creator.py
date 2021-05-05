import os
import json
from sqlalchemy import create_engine
import sys

_args = sys.argv

def createTables(connection):
    connection.execute("CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_CONTACT CHECK (CHAR_LENGTH(contact) >= 3)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_NAME CHECK (CHAR_LENGTH(name) >= 3)")
    connection.execute("ALTER TABLE users ADD CONSTRAINT MINIMO_PSWD CHECK (CHAR_LENGTH(password) >= 3)")
    connection.execute("CREATE TABLE identifiers (idid int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, created datetime)")
    connection.execute("ALTER TABLE identifiers ADD CONSTRAINT MINIMO_IDENT CHECK (CHAR_LENGTH(name) >= 3)")
    connection.execute("CREATE TABLE pkeys (idke int PRIMARY KEY AUTO_INCREMENT, name varchar(384) NOT NULL UNIQUE, created datetime)")
    connection.execute("CREATE TABLE messages (name varchar(64) PRIMARY KEY NOT NULL UNIQUE, milestone int NOT NULL, timestamp int NOT NULL, identifier varchar(100) NOT NULL, data varchar(6000) NOT NULL, idid int)")
    connection.execute("CREATE TABLE ident_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idid int NOT NULL)")
    connection.execute("CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL)")
    connection.execute("CREATE TABLE pkeys_ident (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idid int NOT NULL)")

    connection.close()

def saveConfig(config, PATH):
    with open("{}/config.txt".format(PATH), "w+") as outfile:
        json.dump(config, outfile)

def main(PATH):
    answer = _args[1]
    host = _args[2]
    port = _args[3]

    if answer == 'y' or answer == 'yes' or answer == 'ye' or answer == 'Y' or answer == 'Yes' or answer == 'YES':
        user = _args[4]
        pswd = _args[5]
        database = _args[6]
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
        rootpswd = _args[7]
        user = _args[4]
        pswd = _args[5]
        database = _args[6]

        engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}"
                            .format(user='root',
                                    pw=rootpswd,
                                    host=host,
                                    port=port))
        
        connection = engine.connect()

        connection.execute("CREATE USER '{}'@'localhost' IDENTIFIED BY '{}'".format(user, pswd))
        connection.execute("CREATE USER '{}'@'%%' IDENTIFIED BY '{}'".format(user, pswd))
        connection.execute("GRANT ALL PRIVILEGES ON *.* TO '{}'@'localhost'".format(user))
        connection.execute("GRANT ALL PRIVILEGES ON *.* TO '{}'@'%%'".format(user))

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

PATH = os.path.dirname(os.path.realpath(__file__))
main(PATH)