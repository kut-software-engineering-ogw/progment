# coding:utf-8
"""
セッション管理データベースモジュール
セッション管理データベースへの操作を行うモジュール
"""
import random
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

default_login_user='root'
default_login_password='root00'
default_login_host='127.0.0.1'
default_login_database='progment'

class SessionDB:
    """
    セッション管理データベースへの操作を行うクラス
    """
    def __init__(self, user=default_login_user, password=default_login_password,
                        host=default_login_host, database=default_login_database):
        self.connect = mysql.connector.connect(user=user, password=password, host=host, database=database)
        self.cur = self.connect.cursor(dictionary=True)

    def sign_in(self, user_id):
        """
        入力されたユーザIDのセッションを登録するメソッド
        :param user_id:
        :return: 登録されたセッションID
        """
        session_id = str(random.randint(1, 100000000)) + user_id
        stmt = (
            'INSERT INTO session (session_id, user_id) '
            'VALUES (%s, %s)'
        )
        data = (session_id, user_id)
        self.cur.execute(stmt, data)
        return session_id

    def sign_out(self, session_id):
        """
        入力されたセッションIDのセッション情報を削除する
        :param session_id:
        :return: 処理が成功した場合ture，失敗した場合false
        """
        stmt = (
            'DELETE FROM session '
            'WHERE session_id=%s'
        )
        try:
            self.cur.execute(stmt, (session_id,))
        except Exception as e:
            return False
        return True


    def get_session_info(self, session_id):
        """
        入力されたセッションIDの情報を取得するメソッド
        :param session_id:
        :return: セッション情報のディクショナリ
        """
        stmt = (
            'SELECT session_id, user_id FROM session '
            'WHERE session_id=%s'
        )
        self.cur.execute(stmt, (session_id,))
        return self.cur.fetchone()

    def commit(self):
        """
        コミットを行うメソッド
        :return:
        """
        self.cur.execute('COMMIT;')
        return

    def close(self):
        """
        データベースとの接続を終了するメソッド
        :return:
        """
        self.cur.close()
        self.connect.close()
