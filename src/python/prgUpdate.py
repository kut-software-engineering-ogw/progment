#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import mysql.connector
# in: usrId, out: prgNameList

def prg_update_app(environ, start_response):
    """
    作業データを作業データテーブルから削除するメソッド
    """

    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgID')
    workSpaceData = form.getfirst('workSpaceData')
    comment = form.getfirst('comment')

    result = prgUpdate(prgId, workSpaceData, comment)

    output = '<return result="0">'
    if result == "1":
        output = '<return result="1">'
    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output.encode()


def prgUpdate(prgId, prgData, comment):
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update work_data " "set workspace = %s, comment = %s " "where data_id = %s")
    data = (prgData, comment, prgId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "1"

    #prgUpdate("12345678910003", "prgUpdateTest", "from prgUpdate.py")
