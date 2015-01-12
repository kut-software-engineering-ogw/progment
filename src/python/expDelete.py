#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import mysql.connector
# in: usrId, out: prgNameList

def exp_delete_app(environ, start_response):
    """
    課題データを課題データテーブルから削除するメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    expId = form.getfirst('expId')

    result = expDelete(expId)

    output = '<return result="0">'
    if result == "1":
        output = '<return result="1">'
    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output.encode()

def expDelete(exerciseId):
    expId = exerciseId
    connect = mysql.connector.connect(user='root', password='yokolab', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("delete from exp_data " "where exp_id = %s ")
    data = (expId,)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "1"
    #expDelete("000", "19191919191")
