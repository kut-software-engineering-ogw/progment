#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def expDataGet(autId, expId):
autId = '00000000000'
expId = '000'
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("select exe_data from exeData " "where exercise_id = %s and author_user_id = %s")
data = (expId, autId)
cur.execute(stmt, data)
expData = cur.fetchall()
cur.close()
connect.close()
print(expData)
#print(prgNameList)
#return prgData
