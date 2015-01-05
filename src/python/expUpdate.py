#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def expUpdate(work_data_id):
expId = "999"
expData = "updateTest(expData)"
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("update exeData " "set exe_data = %s " "where exercise_id = %s")
data = (expData, expId)
cur.execute(stmt, data)
cur.close()
connect.close()
