#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def prgInsert(prgId, prgName, prgData, usrId):
prgId = "12345678910003"
prgName = "prg4"
prgData = "pythonTest"
usrId = "12345678910"

connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("insert into prgData (work_data_id, work_data_name, work_data, user_id)" "values(%s, %s, %s, %s)")
data = (prgId, prgName, prgData, usrId)
cur.execute(stmt, data)
cur.close()
connect.close()
