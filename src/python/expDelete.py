#!/usr/local/python/bin/python3
# coding:utf-8
import cgi
import sys

import mysql.connector

sys.path.append('/var/www/cgi-bin')
from http_client_error import forbidden
from cookie import get_cookie

def exp_delete_handler(environ, start_response):
    """
    課題データを課題データテーブルから削除するメソッド
    """
    cookie = get_cookie(environ)
    if cookie is None:
        """ セッションを確立していない場合 """
        return forbidden(environ, start_response)
    else:
        """ セッションを確立している場合 """
        form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
        expId = form.getfirst('expId')

        result = expDelete(expId)

        output = (
            '{}'.format(result)
        )
        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)

        return [output.encode()]

def expDelete(exerciseId):
    expId = exerciseId
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("delete from exp_data " "where exp_id = %s ")
    data = (expId,)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "1"
    #expDelete("000", "19191919191")
