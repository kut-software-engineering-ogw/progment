#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import sys

import mysql.connector

sys.path.append('/ver/www/cgi-bin')
from cookie import get_cookie
from http_client_error import forbidden

def prg_update_handler(environ, start_response):
    """
    作業データを作業データテーブルから削除するメソッド
    """
    cookie = get_cookie(environ)
    if cookie is None:
        """ セッションを確立していない場合 """
        return forbidden(environ, start_response)
    else:
        """ セッションを確立している場合 """
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

        return [output.encode()]

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
