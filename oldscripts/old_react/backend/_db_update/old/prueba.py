import pandas as pd
from pandas.io import sql
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL


engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="PutosRusosSQL13186",
                               db="TFM_DB"))



df = pd.DataFrame(columns=['name','timestamp','address','tag','trytes'])

df['name'] = ['HOLA']
df['timestamp'] = ['MUNDO']
df['address'] = ['QUE']
df['tag'] = ['TAL']
df['trytes'] = ['ESTAS']

#sql.to_sql(df,con=engine,name='transactions',if_exists='append',index = False)


