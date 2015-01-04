# coding:utf-8
"""
セッションモジュール
セッション管理を行うモジュール
"""

import sys
import Cookie
import datetime

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')
from session_db import SessionDB

default_domain = 'localhost'
default_path = '/'

def get_session_info(cookie):
    """
    セッション情報を取得するメソッド
    :param cookie:
    :return: セッション情報(存在しない場合None)
    """
    if cookie.has_key("session"):
        session = SessionDB()
        session_info = session.get_session_info(cookie['session'].value)
        session.close()
        return session_info
    else:
        print ('[cookie-error]: not exist session-cookie')
        return None

def create_cookie(user_id, domain=default_domain, path=default_path):
    """
    クッキー生成メソッド
    :param user_id:
    :return: 生成されたクッキー
    """
    session = SessionDB()
    expiration = datetime.datetime.utcnow() + datetime.timedelta(days=30)
    cookie = Cookie.SimpleCookie()
    cookie["session"] = session.sign_in(user_id=user_id)
    cookie["session"]["domain"] = domain
    cookie["session"]["path"] = path
    cookie["session"]["expires"] = expiration.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
    session.close()

    return cookie
