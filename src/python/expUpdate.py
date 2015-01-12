#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def expUpdate(author_user_id, exerciseId, exerciseData, com, hel, res, lim):
    autUsrId = author_user_id
    expId = exerciseId
    expData = exerciseData
    comment = com
    helpStmt = hel
    result = res
    limitedBlocks = lim
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update exeData " "set exe_data = %s, comment = %s, help = %s, result = %s, limitedBlocks = %s " "where exercise_id = %s and author_user_id = %s")
    data = (expData, comment, helpStmt, result, limitedBlocks, expId, autUsrId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "0"
expUpdate("19191919191", "000", "expUpdateTest", "from expUpdate.py", "help update", "result update", "limitedBlockesUpdate")
