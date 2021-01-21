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
    sql_rem_adds = "DELETE FROM iota_tx_reader2.addresses \
                WHERE idad NOT IN (SELECT idad FROM iota_tx_reader2.add_names \
                GROUP BY idad)"
    mycursor.execute(sql_rem_adds)
    db.commit()

    sql_rem_tags = "DELETE FROM iota_tx_reader2.tags \
            WHERE idta NOT IN (SELECT idta FROM iota_tx_reader2.tag_names \
            GROUP BY idta)"
    mycursor.execute(sql_rem_tags)
    db.commit()

main(db,mycursor)   