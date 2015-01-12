#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def expDataGet(authorId, exerciseId):
    autId = authorId
    expId = exerciseId
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("select exe_data, exercise_id, exercise_name, comment, help, result, limitedBlocks from exeData " "where exercise_id = %s and author_user_id = %s")
    data = (expId, autId)
    cur.execute(stmt, data)
    temp = cur.fetchall()
    expData = temp[0][0]
    expId = temp[0][1]
    expName = temp[0][2]
    comment = temp[0][3]
    helpStmt = temp[0][4]
    result = temp[0][5]
    limitedBlocks = temp[0][6]
    exePrgData = expId + "\n" + expName + "\n#Comment#\n" + comment + "\n#CommentEnd#\n#Help#\n" + helpStmt + "\n#HelpEnd#\n#Program#\n" + expData + "\n#ProgramEnd#\n#Result#\n" + result + "\n#ResultEnd#\n" + limitedBlocks
    cur.close()
    connect.close()
    #print(exePrgData)
    return(exePrgData)
print(expDataGet("00000000000", "000"))
