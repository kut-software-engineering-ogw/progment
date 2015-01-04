#!/usr/local/python/bin/python3
# coding:utf-8
"""
課題データ削除モジュール
"""
import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def exp_delete_app(environ, start_response):
    """
    課題データを課題データテーブルから削除するメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    expId = form.getfirst('expID')

    result = exp_delete(expId)

    output = '<return result="0">'
    if result == "1":
        output = '<return result="1">'
    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output

def exp_delete(expId):
    """
    課題データ削除メソッド
    :param expId: 課題データID
    :return: 処理が成功した場合"1", 処理が失敗した場合"0"
    """
    expId = "999"
    mstUsrId = "99999999999"
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("delete from exeData " "where exercise_id = %s " " and author_user_id = %s")
    data = (expId, mstUsrId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
