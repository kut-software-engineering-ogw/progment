#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def usrInsert(usrId, usrName, usrYear, usrClass, usrNum, mstUsrId, group, usrPasswd):
usrId = "010"
usrName = "usr10"
usrYear = 3
usrClass = "A"
usrNum = "10"
group = 1
usrPasswd = "password10"
mstUsrId = "99999999999"

connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("insert into stdData (user_id, user_name, grade, class, student_number, master_user_id) " "values(%s, %s, %s, %s, %s, %s)")
data = (usrId, usrName, usrYear, usrClass, usrNum, mstUsrId)
cur.execute(stmt, data)
stmt2 = ("insert into usrData (user_id, grouping, password) " "values(%s, %s, %s)")
data2 = (usrId, group, usrPasswd)
cur.execute(stmt2, data2)
cur.close()
connect.close()
