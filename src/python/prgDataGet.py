#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList


def prgDataGet(prgramId):
    prgId = prgramId
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = (
        "select workspace, data_id, data_name, comment from work_data "
        "where data_id = %s"
    )
    data = (prgId,)
    cur.execute(stmt, data)
    temp = cur.fetchall()
    #print(temp[0][0])
    prgData = temp[0][0]
    prgId   = temp[0][1]
    prgName = temp[0][2]
    comment = temp[0][3]
    freePrgData = prgId + "\n" + prgName + "\n" + comment + "\n#Program#\n" + prgData + "\n#ProgramEND#"
    #print(freePrgData)
    cur.close()
    connect.close()
    return freePrgData

    #print(prgDataGet("12345678910", "12345678910000"))
