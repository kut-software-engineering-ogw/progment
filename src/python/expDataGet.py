#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def expDataGet(exerciseId):
    expId = exerciseId
    connect = mysql.connector.connect(user='root', password='yokolab', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("select workspace, exp_id, exp_name, comment, help_menu, result, limit_num from exp_data " "where exp_id = %s")
    data = (expId,)
    cur.execute(stmt, data)
    temp = cur.fetchall()
    expData = temp[0][0]
    expId = temp[0][1]
    expName = temp[0][2]
    comment = temp[0][3]
    helpStmt = temp[0][4]
    result = temp[0][5]
    limitedBlocks = temp[0][6]
    exePrgData = expId + "\n" + expName + "\n#Comment#\n" + comment + "\n#CommentEND#\n#Help#\n" + helpStmt + "\n#HelpEND#\n#Program#\n" + expData + "\n#ProgramEND#\n#Result#\n" + result + "\n#ResultEND#\n" + limitedBlocks
    cur.close()
    connect.close()
    #print(exePrgData)
    return(exePrgData)
    #print(expDataGet("00000000000", "000"))
