# coding:utf-8
"""
ログアウトモジュール
"""

import sys

sys.path.append('/var/www/cgi-bin')
from session import session_disconnect

def sign_out_app(environ, start_response, cookie):
    result = session_disconnect(cookie)
    if result:
        cookie['session']['expires'] = "Thu, 01-Jan-1970 00:00:00 GMT"
        cookie['user_id']['expires'] = "Thu, 01-Jan-1970 00:00:00 GMT"
        status = '302 Found'
        response_headers = [('Location', '/login'),
                            ('Set-Cookie', cookie['session'].OutputString()),
                            ('Set-Cookie', cookie['user_id'].OutputString())]
        start_response(status, response_headers)
        return
    else:
        status = '302 Found'
        response_headers = [('Location', '/menu')]
        start_response(status, response_headers)
        return

