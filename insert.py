# cat con-test.py
import mysql.connector

db = mysql.connector.connect(

    host     = 'sql9.freesqldatabase.com',
    user     = 'sql9219104',
    database = 'sql9219104',
    password = 'muR15uvU9M',   
    port ='3306')

cursor = db.cursor()

sql = "INSERT INTO app_practice(store, sound_level, whenwhere) VALUES ('Legros and Sons', 15, '2018-01-03 14:40:23')"

cursor.execute(sql)
db.commit()  

   
db.close()


