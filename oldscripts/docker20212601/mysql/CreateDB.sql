CREATE DATABASE  IF NOT EXISTS TFM_DB;
CREATE TABLE users (idcl int PRIMARY KEY AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, password varchar (100) NOT NULL, created datetime, contact varchar(100) NOT NULL UNIQUE);
CREATE TABLE addresses (idad int PRIMARY KEY AUTO_INCREMENT, name varchar(90) NOT NULL UNIQUE, created datetime);
CREATE TABLE tags (idta int PRIMARY KEY AUTO_INCREMENT, name varchar(27) NOT NULL UNIQUE, created datetime);
CREATE TABLE temp_hashes (name varchar(81) PRIMARY KEY NOT NULL UNIQUE);
CREATE TABLE temp_table (name varchar(81));
CREATE TABLE transactions (name varchar(81) PRIMARY KEY NOT NULL UNIQUE, timestamp varchar(100) NOT NULL, address varchar(90) NOT NULL, tag varchar(27) NOT NULL, trytes varchar(2673) NOT NULL, idad int, idta int);
CREATE TABLE tag_names (idname varchar(100) PRIMARY KEY, alias varchar(100) NOT NULL, idcl int NOT NULL, idta int NOT NULL);
CREATE TABLE add_names (idname varchar(100) PRIMARY KEY, alias varchar(100) NOT NULL, idcl int NOT NULL, idad int NOT NULL);

