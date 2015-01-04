#!/usr/local/python/bin/python3
# coding:utf-8
"""
作業データ追加モジュール
"""

import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def prg_insert_app(environ, start_response, session_info):
    """
    作業データをプログラムデータテーブルに挿入するメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    usrId = session_info['user_id']
    prgName = form.getfirst('prgName')
    prgData = form.getfirst('prgData')

    prgId = prg_insert(usrId, prgName, prgData)

    output = '<return result="0">'
    if prgId is not None:
        output = '<return prgId="{prgId}" result="1">'.format(prgId=prgId)

    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output

def prg_insert(usrId, prgName, prgData):
    """
    作業データ追加メソッド
    :param usrId: ユーザID
    :param prgName: 作業名
    :param prgData: プログラムデータ
    :return: 新規に与えられた作業ID、失敗した場合None
    """
    prgId = "12345678910003"
    prgName = "prg4"
    prgData = "pythonTest"
    usrId = "12345678910"

    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("insert into prgData (work_data_id, work_data_name, work_data, user_id)" "values(%s, %s, %s, %s)")
    data = (prgId, prgName, prgData, usrId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
