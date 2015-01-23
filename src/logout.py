# coding:utf-8
"""
ログアウトモジュール
"""

import sys

sys.path.append('/var/www/cgi-bin')
from session import session_disconnect
from cookie import get_cookie
from http_client_error import forbidden

def logout_handler(environ, start_response):
    """
    ログアウトメソッド
    :param environ:
    :param start_response:
    :return:
    """
    cookie = get_cookie(environ)
    if cookie is None:
        """ セッションを確立していない場合の処理 """
        print ("forbbiden", environ['PATH_INFO'])
        return forbidden(environ, start_response)
    else:
        """ セッションを確立している場合の処理 """
        result = session_disconnect(cookie)
        if result:
            cookie['session']['expires'] = "Thu, 01-Jan-1970 00:00:00 GMT"
            cookie['user_id']['expires'] = "Thu, 01-Jan-1970 00:00:00 GMT"
            status = '302 Found'
            response_headers = [('Location', '/login'),
                                ('Set-Cookie', cookie['session'].OutputString()),
                                ('Set-Cookie', cookie['user_id'].OutputString())]
            start_response(status, response_headers)
            return []
        else:
            status = '302 Found'
            response_headers = [('Location', '/menu')]
            start_response(status, response_headers)
            return []
