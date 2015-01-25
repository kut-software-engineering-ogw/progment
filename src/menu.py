# coding:utf-8
"""
メニューモジュール
/menuへリクエストが送られた場合に呼び出されるモジュール
Author:      kouhei oosaki
Since:       2015/01/25
Version:     0.0.1
"""

import sys

import mysql.connector

sys.path.append('/var/www/cgi-bin')
from cookie import get_cookie
from http_client_error import forbidden
from link_response import html

def menu_handler(environ, start_response):
    """
    メニューハンドラメソッド
    /menuへリクエストが送られた場合に呼び出されるメソッド
    :param environ:
    :param start_response:
    :return:
    """
    cookie = get_cookie(environ)

    if 'session' in cookie:
        """ セッションを確立している場合 """
        # htmlを生成する
        return html_response(environ, start_response, cookie)
    else:
        """ セッションを確立していない場合 """
        # 403 forbidden
        return forbidden(environ, start_response)

def html_response(environ, start_response, cookie):
    """
    HTMLレスポンスメソッド
    HTMLのレスポンスを行うメソッド
    :param environ:
    :param start_response:
    :param cookie:
    :return:
    """
    # ログインユーザのIDを取得
    user_id = cookie['user_id'].value

    if is_master(user_id) is True:
        """ マスターユーザの場合 """
        return html(environ, start_response, '/html/menu.html')
    else:
        """ マスターユーザ以外の場合 """
        return html(environ, start_response, '/html/menu.html')

def is_master(user_id):
    """
    マスターユーザ確認メソッド
    :param user_id:
    :return: マスタユーザならTrue，それ以外ならFalse
    """

    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor(dictionary=True)
    stmt = (
        'SELECT group_num from user '
        'WHERE group_num = 1;'
    )
    cur.execute(stmt)
    result = cur.fetchone()
    if result is None:
        return False
    else:
        return True
