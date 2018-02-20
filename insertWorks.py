# cat con-test.py
import mysql.connector

db = mysql.connector.connect(

    host     = 'sql9.freesqldatabase.com',
    user     = 'sql9219104',
    database = 'sql9219104',
    password = 'muR15uvU9M',   
    port ='3306')

cursor = db.cursor()

store = 'Legros and Sons'
sound_level = 10
whenwhere = '2018-01-03 14:40:23'
 
#edit this to have only timestamp and sound data
data = [
(store, 16, '2018-01-03 14:40:22'),
(store, 16, '2018-01-03 14:40:23'),
(store, 16, '2018-01-03 14:40:24'),
(store, 15, '2018-01-03 14:40:25'),
(store, 15, '2018-01-03 14:40:26'),
]
 
#need to make city, or what will replace city ie app_practice, a variable
sql = "INSERT INTO app_practice(store, sound_level, whenwhere) VALUES(%s, %s, %s)"

number_of_rows = cursor.executemany(sql, data)

#sql = "INSERT INTO app_practice(store, sound_level, whenwhere) VALUES ('Legros and Sons', 15, '2018-01-03 14:40:23')"

#cursor.execute(sql)
db.commit()  

   
db.close()

