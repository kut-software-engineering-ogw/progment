#!/usr/local/bin/python3
# -*- coding:utf-8 -*-
import mysql.connector
connect = mysql.connector.connect(user= 'root', password= 'root00', host= '127.0.0.1', database= 'ogwMemberList')
cur = connect.cursor()
stmt = ("INSERT INTO ogwMemberList(name, lab)" "VALUES(%s, %s)")
data = ('Musuka', 'YokoyamaLab')
cur.execute(stmt, data)
#connect.comit()
cur.close()
connect.close()
