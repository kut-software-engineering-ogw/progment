#!/usr/local/python/bin/python3
# coding:utf-8
"""
課題エディットデータ編集モジュール
"""

import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def exp_update_app(environ, start_response):
    """
    呼び出しメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    master_user_id = form.getfirst('masterUserId')
    exp_name = form.getfirst('expName')
    exp_data = form.getfirst('WorkSpaceData')
    comment = form.getfirst('comment')
    help_menu = form.getfirst('helpMenu')
    limit_blocks = form.getfirst('limitedBlocks')

    expId = exp_update(exp_id, master_user_id, exp_name, exp_data, comment, help_menu, result, limit_blocks)

    output = '<return result="0">'
    if expId is not None:
        output = '<return prgId="{expId}" result="1">'.format(expId=expId)

    status = '200 OK'
    response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return output


def exp_update(exp_id, master_user_id, exp_name, exp_data, comment, help_menu, result, limit_blocks):
    """
    課題エディットデータ編集メソッド
    :param exp_id: 対象の課題ID
    :param master_user_id: 新規マスタユーザID
    :param exp_name: 新規課題名
    :param exp_data: 新規課題データ
    :param comment: 新規コメント
    :param help_menu: 新規ヘルプメニュー
    :param result: 新規処理結果
    :param limit_blocks: 新規ブロック数上限
    :return: 処理が成功した場合は "1", 失敗した場合は "0"
    """
    expId = "999"
    expData = "updateTest(expData)"
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update exeData " "set exe_data = %s " "where exercise_id = %s")
    data = (expData, expId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
