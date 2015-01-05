# coding:utf-8
"""
Cookieモジュール
"""

import sys
import http.cookies
import datetime

sys.path.append('/var/www/cgi-bin')
from session_db import SessionDB
from session import check_session

default_domain = '172.21.34.106'
default_path = '/'

def create_cookie(user_id, domain=default_domain, path=default_path):
    """
    Cookie生成メソッド
    :param user_id:
    :return: 生成されたクッキー
    """
    session = SessionDB()
    expiration = datetime.datetime.utcnow() + datetime.timedelta(days=30)
    cookie = http.cookies.SimpleCookie()
    cookie["session"] = session.sign_in(user_id=user_id)
    cookie["session"]["domain"] = domain
    cookie["session"]["path"] = path
    cookie["session"]["expires"] = expiration.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
    cookie["user_id"] = user_id
    cookie["user_id"]["domain"] = domain
    cookie["user_id"]["path"] = path
    cookie["user_id"]["expires"] = expiration.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
    session.commit()
    session.close()

    return cookie

def get_cookie(environ):
    """
    Cookie取得メソッド
    :param envrion:
    :return: Cookieがある場合Cookie(http.cookies)を返し、無い場合Noneを返す
    """
    if "HTTP_COOKIE" in environ:
        print ('[cookie]: has cookie')
        cookie = http.cookies.SimpleCookie()
        cookie.load(environ['HTTP_COOKIE'])
        session_id = cookie['session'].value
        user_id = cookie['user_id'].value
        if check_session(session_id, user_id) is False:
            return None
        print ('[session-id]:', session_id)
        print ('[login-user]:', user_id)
        return cookie
    else:
        return None
