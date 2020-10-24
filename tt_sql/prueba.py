import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="testDB"
)

mycursor=db.cursor()

#mycursor.execute("CREATE TABLE Clients (id int PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, email varchar(100) NOT NULL, created datetime)")

#mycursor.execute("INSERT INTO Clients (name, email, created) VALUES (%s,%s,%s)", ("Nacho", "achugon@gmail.com", datetime.now()))

#db.commit()

mycursor.execute("SELECT * FROM Clients WHERE name = 'Nacho'")

print(mycursor)
for x in mycursor:
    print(x)

