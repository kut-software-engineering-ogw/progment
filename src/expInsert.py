#!/usr/local/python/bin/python3
# coding:utf-8
"""
課題ディットデータ追加モジュール
"""

import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def exp_insert_app(environ, start_response, session_info):
    """
    呼び出しメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    master_user_id = session_info['user_id']
    exp_name = form.getfirst('expName')
    exp_data = form.getfirst('WorkSpaceData')
    comment = form.getfirst('comment')
    help_menu = form.getfirst('helpMenu')
    limit_blocks = form.getfirst('limitedBlocks')

    expId = exp_insert(master_user_id, exp_name, exp_data, comment, help_menu, limit_blocks)

    output = '<return result="0">'
    if expId is not None:
        output = '<return prgId="{expId}" result="1">'.format(expId=expId)

    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output

def exp_insert(master_user_id, exp_name, exp_data, comment, help_menu, result, limit_blocks):
    """
    課題ディットデータ追加メソッド
    :param master_user_id: 新規マスターユーザID
    :param exp_name: 新規課題名
    :param exp_data: 新規課題データ
    :param comment: 新規コメント
    :param help_menu: 新規ヘルプメニュー
    :param limit_blocks: 新規個数上限
    :return: 処理が成功した場合、課題IDを返し、失敗した場合Noneを返す
    """
    expId = "999"
    expName = "expTest"
    expData = "pythonTest(expData)"
    mstUsrId = "99999999999"

    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("insert into exeData (exercise_id, author_user_id, exe_data, exercise_name)" "values(%s, %s, %s, %s)")
    data = (expId, mstUsrId, expData, expName)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
