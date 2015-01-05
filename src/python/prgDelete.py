#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def prgDelete(work_data_id):
workDataId = "12345678910003"
usrId = "12345678910"
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
stmt = ("delete from prgData " "where prgData.work_data_id = %s " " and user_id = %s")
data = (workDataId, usrId)
cur.execute(stmt, data)
cur.close()
connect.close()
