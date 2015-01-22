#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import mysql.connector
# in: usrId, out: prgNameList

def exp_insert_app(environ, start_response, master_user_id):
    """
    呼び出しメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    exp_name = form.getfirst('expName')
    exp_data = form.getfirst('workSpaceData')
    comment = form.getfirst('comment')
    help_menu = form.getfirst('helpMenu')
    result = form.getfirst('result')
    limit_blocks = form.getfirst('limitedBlocks')

    expId = expInsert(master_user_id, exp_name, exp_data, comment, help_menu, result, limit_blocks)

    output = '<return result="0">'
    if expId is not None:
        output = '<return prgId="{expId}" result="1">'.format(expId=expId)

    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output.encode()

def expInsert(masterUserId, exerciseName, exerciseData, com, hel, res, lim):
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
    cur.execute("select exp_id from exp_data where user_id = " + mstUsrId)
    tmp = cur.fetchall()
    count = len(tmp)
    expId = "0".zfill(14)
    if count > 0:
        cur.execute("select max(exp_id) from exp_data where user_id = " + mstUsrId)
        tmp = cur.fetchone()
        expId = str(int(tmp[0]) + 1).zfill(14)
    stmt = ("insert into exp_data (exp_id, user_id, workspace, exp_name, comment, help_menu, result, limit_num)" "values(%s, %s, %s, %s, %s, %s, %s, %s)")
    data = (expId, mstUsrId, expData, expName, comment, helpStmt, result, limitedBlockes)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return expId
    #expInsert("pythonTest", "insertData", "19191919191", "insert ok?", "help ok?", "result ok?", "1,2,3,4,5(limit)")
