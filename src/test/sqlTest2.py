#!/usr/local/bin/python3
# -*- codind:utf-8 -*-
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
import mysql.connector

connect = mysql.connector.connect(user= 'root', password= 'root00', host= '127.0.0.1', database= 'ogwMemberList')
cur = connect.cursor()
cur.execute('select * from ogwMemberList')
rows = cur.fetchall()
for row in rows:
    print(row)
cur.close()
connect.close()
