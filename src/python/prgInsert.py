#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import sys

import mysql.connector

sys.path.append('/var/www/cgi-bin')
from http_client_error import forbidden
from cookie import get_cookie

def prg_insert_handler(environ, start_response):
    """
    作業データをプログラムデータテーブルに挿入するメソッド
    """
    cookie = get_cookie(environ)
    if cookie is None:
        """ セッションを確立していない場合 """
        return forbidden(environ, start_response)
    else:
        """ セッションを確立している場合 """
        usrId = cookie['user_id'].value
        form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
        prgName = form.getfirst('prgName')
        prgData = form.getfirst('workSpaceData')
        comment = form.getfirst('comment')
        prgId = prgInsert(usrId, prgName, prgData, comment)

        output = '<return result="0">'
        if prgId is not None:
            output = '<return prgId="{prgId}" result="1">'.format(prgId=prgId)

        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)

        return [output.encode()]

def prgInsert(userId, programName, programData, com):
    usrId = userId
    prgName = programName
    prgData = programData
    comment = com
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    cur.execute('select user_id from work_data')
    tmp = cur.fetchall()
    count = len(tmp)
    if count > 0 :
        cur.execute("select max(data_id) from work_data")
        max_data_id = cur.fetchone()[0]
        prgId = str(int(max_data_id) + 1).zfill(14)
        print ("exist data", prgId)
    else:
        prgId = "0".zfill(14)
        print ("not exist data", prgId)
    stmt = ("insert into work_data (data_id, data_name, workspace, user_id, comment)" "values(%s, %s, %s, %s, %s);")
    data = (prgId, prgName, prgData, usrId, comment)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return prgId
    #prgInsert("12345678910", "pythonTest", "prgInsertTest", "from prgInsert.py")
