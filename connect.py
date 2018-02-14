#cat con-test.py
import mysql.connector

conn = mysql.connector.connect(

#must input information
    host     = '',
    user     = 's',
    database = '',
    password = '',   
    port ='3306')

cur = conn.cursor()

cur.execute("SELECT * FROM app_practice")
rows = cur.fetchall()
for row in rows:
    for col in row:
        print ("%s," % col)
    print ("\n")

cur.close()

conn.close()
