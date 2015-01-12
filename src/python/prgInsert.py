#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def prgInsert(userId, programName, programData, com):
    usrId = userId
    prgName = programName
    prgData = programData
    comment = com
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    cur.execute('select user_id from prgData where user_id = '+ usrId)
    tmp = cur.fetchall()
    count = len(tmp)
    
    if count > 0 :
        cur.execute("select max(work_data_id) + 1 from prgData where user_id = " + usrId)
        tmp = cur.fetchall()
        prgId = tmp[0][0]
    #print(prgId)
    else:
        prgId = usrId + "000"
    stmt = ("insert into prgData (work_data_id, work_data_name, work_data, user_id, comment)" "values(%s, %s, %s, %s, %s)")
    data = (prgId, prgName, prgData, usrId, comment)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "0"
prgInsert("12345678910", "pythonTest", "prgInsertTest", "from prgInsert.py")
