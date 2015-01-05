#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def usrDelete(usrId, mstUsrId):
usrId = "010"
mstUsrId = "99999999999"
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("delete from stdData " "where user_id = %s " " and master_user_id = %s")
data = (usrId, mstUsrId)
cur.execute(stmt, data)
cur.execute("delete from usrData " "where user_id = "+ usrId)
cur.close()
connect.close()
