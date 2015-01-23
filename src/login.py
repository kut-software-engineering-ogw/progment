# coding:utf-8
"""
ログインモジュール
ユーザがログイン情報をサーバに送信し、セッションを確立するための処理を行う
Author:     kouhei oosaki
Version:    0.0.1
Since:      2015/01/23
"""
import sys
import cgi

sys.path.append('/var/www/cgi-bin')

from cookie import get_cookie, create_cookie
from link_response import html
from collation import collation
from http_client_error import bad_request
from http_ridirection import found

def login_handler(environ, start_response):
    """
    ログインハンドラモジュール
    /loginへリクエストを受けた際に呼び出される。
    Sessionの有無やGETかPOSTかを判断して、HTML生成か認証を行うかを判断する
    :param envrion:
    :param start_response:
    :return:
    """
    # クッキーの情報を取得
    cookie = get_cookie(environ)

    if cookie is None:
        """ セッションを確立していない場合 """
        method = environ['REQUEST_METHOD']
        if method == 'GET':
            """ リクエストがGETメソッドである場合 """
            # ログイン画面HTML生成
            return html(environ, start_response, '/html/login.html')
        elif method == 'POST':
            """ リクエストがPOSTメソッドである場合 """
            # POSTされた情報を取得
            form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
            cId = form.getfirst('cId', "")
            cPassword = form.getfirst('cPassword', "")
            r_value = collation(cId, cPassword)
            if r_value is True:
                """ ログイン成功時の処理 """
                print ("login success")
                status = '302 Found'
                cookie = create_cookie(cId)
                response_headers = [('Location', '/menu'),
                                    ('Set-Cookie', cookie["session"].OutputString()),
                                    ('Set-Cookie', cookie["user_id"].OutputString())]
                start_response(status, response_headers)
                return []
            else:
                """ ログイン失敗時の処理 """
                # ログイン失敗画面HTML生成
                print ("login error")
                return html(environ, start_response, '/html/login_error.html')
        else:
            """ GETでもPOSTでもない場合 """
            # 400 Bad Request
            return bad_request(environ, start_response)
    else:
        """ すでにセッションを確立している場合 """
        # 302 Found
        return found('/menu', environ, start_response)
