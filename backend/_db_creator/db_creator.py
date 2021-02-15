import mysql.connector
from datetime import datetime
import config as NAME

db = mysql.connector.connect(
    host=NAME.HOST,
    user=NAME.USER,
    passwd=NAME.PASSWORD,
)

mycursor = db.cursor()
mycursor.execute('CREATE DATABASE {}'.format(NAME.DATABASE))