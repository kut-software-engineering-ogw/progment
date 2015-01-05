#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def expInsert(expId, expName, expData, mstUsrId):
expId = "999"
expName = "expTest"
expData = "pythonTest(expData)"
mstUsrId = "99999999999"

connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("insert into exeData (exercise_id, author_user_id, exe_data, exercise_name)" "values(%s, %s, %s, %s)")
data = (expId, mstUsrId, expData, expName)
cur.execute(stmt, data)
cur.close()
connect.close()
