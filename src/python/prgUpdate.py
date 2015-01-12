#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def prgUpdate(programId, programData, com):
    prgId = programId
    prgData = programData
    comment = com
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update prgData " "set work_data = %s, comment = %s " "where work_data_id = %s")
    data = (prgData, com, prgId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "0"

prgUpdate("12345678910003", "prgUpdateTest", "from prgUpdate.py")
