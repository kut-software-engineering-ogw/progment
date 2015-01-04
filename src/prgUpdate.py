#!/usr/local/python/bin/python3
# coding:utf-8
"""
作業データ更新モジュール
"""
import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def prg_update_app(environ, start_response):
    """
    作業データを作業データテーブルから削除するメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgID')
    prgName = form.getfirst('prgName')
    workSpaceData = form.getfirst('workSpaceData')
    comment = form.getfirst('comment')

    result = prg_update(prgId, prgName, workSpaceData, comment)

    output = '<return result="0">'
    if result == "1":
        output = '<return result="1">'
    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output

def prg_update(prgId, prgName, prgData, comment):
    """
    作業データテーブルにある作業情報を更新する
    :param prgId: 作業データのID
    :param prgName: 新しい作業データの名前
    :param prgData: 新しい作業データ(ワークスペースの内容)
    :param comment: 新しいコメント
    :return: 処理が成功した場合"1", 失敗した場合"0"
    """
    prgId = "12345678910003"
    prgData = "updateTest"
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update prgData " "set work_data = %s " "where work_data_id = %s")
    data = (prgData, prgId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
