#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def usrUpdate(usrId, usrName, usrYear, usrClass, usrNum, mstUsrId, group, usrPasswd):
    usrId = "010"
    usrName = "usr10.1"
    usrYear = 3
    usrClass = "upd"
    usrNum = "10"
    group = 1
    usrPasswd = "password10.0"

    connect = mysql.connector.connect(user='root', password='yokolab', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update stdData " "set user_name = %s, grade = %s, class = %s, student_number = %s " "where user_id = %s")
    data = (usrName, usrYear, usrClass, usrNum, usrId)
    cur.execute(stmt, data)
    stmt = ("update usrData set grouping = %s, password = %s " "where user_id = %s")
    data = (group, usrPasswd, usrId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
