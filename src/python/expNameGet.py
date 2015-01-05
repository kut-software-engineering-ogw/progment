#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def expNameGet(usrId):
usrId = '0000000000'
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
cur.execute('select exercise_name from exeData where author_user_id = '+ usrId)
expNames = cur.fetchall()
#cur.execute('select count(*) from exeData where author_user_id = '+ usrId)
#count = cur.fetchall()
cur.close()
connect.close()
#print(expNames)
expNameList = []
for expName in expNames:
    expNameList.append({'expName':expName})
#print(prgNameList)
#return expNameList
