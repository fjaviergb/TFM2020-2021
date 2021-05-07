import json
import asyncio
import pandas as pd
from sqlalchemy import create_engine
import time
import os
import iota_client

PATH = os.path.dirname(os.path.realpath(__file__))

with open("{}/../config.txt".format(PATH)) as f:
  config = json.load(f)

client = iota_client.Client()

engine = create_engine("mysql+pymysql://{user}:{pw}@{host}:{port}/{db}"
                       .format(user=config['user'],
                               pw=config['password'],
                               host=config['host'],
                               db=config['database'],
                               port=config['port']))
connection = engine.connect()

async def _client(connection,_key,row):
    brute_data = client.find_messages([row[1]])
    sql_query = "SELECT name FROM messages"
    records = connection.execute(sql_query)
    records = records.fetchall()
    df = pd.DataFrame(columns=['name','milestone','timestamp','identifier','data','idid'])
    brute_df = pd.DataFrame(brute_data)
    print("Requesting {}, length {}".format(row[0],len(brute_data)))
    if len(records) > 0:
        brute_df = brute_df[~brute_df['message_id'].isin(map(lambda x: x[0], records))]
    try:
        df['name'] = brute_df['message_id']
        df['data'] = brute_df['payload'].apply(lambda x: bytearray(x['indexation'][0]['data']),1)
        df['milestone'] = brute_df['message_id'].apply(lambda x: client.get_message_metadata(x)['referenced_by_milestone_index'],1)
        df['timestamp'] = df['milestone'].apply(lambda x: client.get_milestone(x)['timestamp'],1)
        df.loc[:,'identifier'] = row[1]
        df.to_sql('messages', engine, if_exists ='append',index=False)
    except KeyError:
        print("Exception empty; incomplete; etc")

async def main(connection,_key):
    sql_query = "SELECT * FROM %s" % _key
    records = connection.execute(sql_query)
    records = records.fetchall()
    tasks=[]

    for row in records:
        tasks.append(asyncio.create_task(_client(connection,_key,row)))
    await asyncio.gather(*tasks)

print(time.ctime(time.time()))
loop = asyncio.get_event_loop()
loop.run_until_complete(main(connection,'identifiers'))
connection.close()