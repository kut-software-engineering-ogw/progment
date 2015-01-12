#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList


def prgDataGet(userId, prgramId):
    usrId = userId
    prgId = prgramId
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("select work_data, work_data_id, work_data_name, comment from prgData " "where work_data_id = %s and user_id = %s")
    data = (prgId, usrId)
    cur.execute(stmt, data)
    temp = cur.fetchall()
    #print(temp[0][0])
    prgData = temp[0][0]
    prgId   = temp[0][1]
    prgName = temp[0][2]
    comment = temp[0][3]
    freePrgData = prgId + "\n" + prgName + "\n" + comment + "\n#Program#\n" + prgData + "\n#ProgramEnd#"
    #print(freePrgData)
    cur.close()
    connect.close()
    return freePrgData

print(prgDataGet("12345678910", "12345678910000"))
