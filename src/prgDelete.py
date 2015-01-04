#!/usr/local/python/bin/python3
# coding:utf-8
"""
作業データ削除モジュール
"""
import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def prg_delete_app(environ, start_response):
    """
    作業データを作業データテーブルから削除するメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgID')

    result = prg_delete(prgId)

    output = '<return result="0">'
    if result == "1":
        output = '<return result="1">'
    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output

def prg_delete(prgId):
    """
    作業データ削除メソッド
    :param prgId: 作業データのID
    :return: 処理が成功した場合 "1"、失敗した場合 "0"
    """
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("delete from prgData " "where prgData.work_data_id = %s ")
    data = prgId
    cur.execute(stmt, data)
    cur.close()
    connect.close()
