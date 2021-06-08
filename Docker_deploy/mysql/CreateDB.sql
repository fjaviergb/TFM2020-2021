CREATE DATABASE IF NOT EXISTS TFM13186;
CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE);
ALTER TABLE users ADD CONSTRAINT MINIMO_CONTACT CHECK (CHAR_LENGTH(contact) >= 1);
ALTER TABLE users ADD CONSTRAINT MINIMO_NAME CHECK (CHAR_LENGTH(name) >= 1);
ALTER TABLE users ADD CONSTRAINT MINIMO_PSWD CHECK (CHAR_LENGTH(password) >= 1);
CREATE TABLE identifiers (idid int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, created datetime);
ALTER TABLE identifiers ADD CONSTRAINT MINIMO_IDENT CHECK (CHAR_LENGTH(name) >= 1);
CREATE TABLE pkeys (idke int PRIMARY KEY AUTO_INCREMENT, name varchar(384) NOT NULL UNIQUE, created datetime);
CREATE TABLE messages (name varchar(64) PRIMARY KEY NOT NULL UNIQUE, milestone int NOT NULL, timestamp int NOT NULL, identifier varchar(100) NOT NULL, data varchar(10000) NOT NULL, idid int, created int);
CREATE TABLE ident_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(100) NOT NULL, idcl int NOT NULL, idid int NOT NULL);
CREATE TABLE pkey_names (idname int PRIMARY KEY AUTO_INCREMENT, alias varchar(384) NOT NULL, idcl int NOT NULL, idke int NOT NULL);
CREATE TABLE pkeys_ident (idkt int PRIMARY KEY AUTO_INCREMENT, idke int NOT NULL, idcl int NOT NULL, idid int NOT NULL);

