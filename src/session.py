# coding:utf-8
"""
セッション処理モジュール
セッション管理を行うモジュール
"""

import sys

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')
from session_db import SessionDB

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
def session_disconnect(cookie):
    """
    セッション終了メソッド
    :param cookie:
    :return: 処理が成功した場合 Ture, 失敗した場合Falseを返す
    """
    session = SessionDB()
    result = session.sign_out(cookie['session'].value)
    return result

def check_session(session_id, user_id):
    """
    セッションチェックメソッド
    :param session_id: 検査するセッションID
    :param user_id: 検査するユーザID
    :return: 正当なセッションならTrue, 不正なセッションならFalseを返す
    """
    session = SessionDB()
    session_info = session.get_session_info(session_id)
    if session_info is None:
        print ("[wrong-session]:", session_id)
        return False
    else:
        if user_id == session_info['user_id']:
            print ("[approval]:", session_id)
            return True
        else:
            print ("[wrong-user_id]:", session_id, user_id)
            return False