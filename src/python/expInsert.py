#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

def expInsert(exerciseName, exerciseData, masterUserId, com, hel, res, lim):
    expName = exerciseName
    expData = exerciseData
    mstUsrId = masterUserId
    comment = com
    helpStmt = hel
    result = res
    limitedBlockes = lim
    
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
# make new expId
    cur.execute("select exercise_id from exeData where author_user_id = " + mstUsrId)
    tmp = cur.fetchall()
    count = len(tmp)
    if count > 0 :
        cur.execute("select max(exercise_id) + 1 from exeData where author_user_id = "+ mstUsrId)
        tmp = cur.fetchall()
        if tmp[0][0] < 10 :
            expId = "00" + str(int(tmp[0][0]))
        elif tmp < 100 :
            expId = "0" + str(int(tmp[0][0]))
        else:
            expId = str(int(tmp[0][0]))
    else:
        expId = "000"
#print(expId)
    stmt = ("insert into exeData (exercise_id, author_user_id, exe_data, exercise_name, comment, help, result, limitedBlocks)" "values(%s, %s, %s, %s, %s, %s, %s, %s)")
    data = (expId, mstUsrId, expData, expName, comment, helpStmt, result, limitedBlockes)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "0"
expInsert("pythonTest", "insertData", "19191919191", "insert ok?", "help ok?", "result ok?", "1,2,3,4,5(limit)")
