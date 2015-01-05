#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def expNameGet(usrId):
usrId = '12345678910'
prgId = '12345678910000'
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("select work_data from prgData " "where work_data_id = %s and user_id = %s")
data = (prgId, usrId)
cur.execute(stmt, data)
prgData = cur.fetchall()
cur.close()
connect.close()
print(prgData)
#print(prgNameList)
#return prgData
