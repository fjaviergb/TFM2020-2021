from sqlalchemy import create_engine
import os
import pandas as pd

engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                       .format(user='fjavigb',
                               pw='13186',
                               host='localhost',
                               db='ENDING',
                               port='3306'))
connection = engine.connect()

sql_query = "SELECT * FROM messages WHERE NOT idid IS NULL"
records = connection.execute(sql_query)
records = records.fetchall()
df = pd.DataFrame(records, columns=['name', 'milestone', 'timestamp', 'identifier', 'data', 'idid', 'created'])
print(df['timestamp'].max(axis = 0) - df['timestamp'].min(axis = 0))
df2 = pd.DataFrame(columns=['timelapse'])
df2['timelapse'] = df.loc[:,'created'] - df.loc[:,'timestamp']
print(df2.mean(axis = 0))
print(df2.max(axis = 0))
print(df2.min(axis = 0))
