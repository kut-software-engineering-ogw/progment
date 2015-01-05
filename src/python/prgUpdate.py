#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def prgUpdate(work_data_id):
prgId = "12345678910003"
prgData = "updateTest"
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("update prgData " "set work_data = %s " "where work_data_id = %s")
data = (prgData, prgId)
cur.execute(stmt, data)
cur.close()
connect.close()
