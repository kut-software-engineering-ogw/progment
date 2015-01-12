#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def expDelete(exerciseId, authorUserId):
    expId = exerciseId
    autUsrId = authorUserId
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("delete from exeData " "where exercise_id = %s " " and author_user_id = %s")
    data = (expId, autUsrId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "0"
expDelete("000", "19191919191")
