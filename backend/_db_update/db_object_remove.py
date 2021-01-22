import json
import asyncio
import aiohttp
import mysql.connector
from datetime import datetime
from iota import Transaction,TryteString
import csv
import pandas as pd
from iota.trits import int_from_trits
import os
import numpy as np
import math


db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="PutosRusosSQL13186",
    database="TFM_DB",
    allow_local_infile=True
)
mycursor = db.cursor(buffered=True)

def main(db,mycursor):
    sql_rem_adds = "DELETE FROM TFM_DB.addresses \
                WHERE idad NOT IN (SELECT idad FROM TFM_DB.add_names \
                GROUP BY idad)"
    mycursor.execute(sql_rem_adds)
    db.commit()

    sql_rem_tags = "DELETE FROM TFM_DB.tags \
            WHERE idta NOT IN (SELECT idta FROM TFM_DB.tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_rem_tags)
    db.commit()

    print('Addresses & Tags removed succesfully')

main(db,mycursor)   