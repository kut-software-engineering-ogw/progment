#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def prgNameGet(usrId):
usrId = '12345678910'
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
cur.execute('select work_data_name from prgData where user_id = '+ usrId)
prgNames = cur.fetchall()
cur.execute('select count(*) from prgData where user_id = '+ usrId)
count = cur.fetchall()
cur.close()
connect.close()
print(prgNames)
prgNameList = []
for prgName in prgNames:
    prgNameList.append({'prgName':prgName})
#print(prgNameList)
#return prgNameList
