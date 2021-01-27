import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="testDB"
)

mycursor=db.cursor()

#mycursor.execute("CREATE TABLE Clients (id int PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, email varchar(100) NOT NULL, created datetime, addresses JSON)")

mycursor.execute("INSERT INTO Clients (name, email, created, addresses) VALUES (%s,%s,%s,%s)", ("Mer", "achugon@gmail.com", datetime.now(), '[1,2,3,4]'))

#mycursor.execute("ALTER TABLE Clients ADD COLUMN addresses JSON")

db.commit()

mycursor.execute("SELECT *, COUNT(*) FROM Clients GROUP BY name ORDER BY name ASC")

print(mycursor)
for x in mycursor:
    print(x)

