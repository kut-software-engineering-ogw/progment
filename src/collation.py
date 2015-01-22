# coding:utf-8
"""
照合モジュール
    入力されたログイン情報からデータベースに問い合わせを行い正当なログインか照合を行う
    また結果に応じたレスポンスも生成する
"""
import cgi
import sys

import mysql.connector

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')
from cookie import create_cookie


def collation_app(environ, start_response):
    """
    照合モジュールへのリクエスト受け付けメソッド
    """
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    cId = form.getfirst('cId', "")
    cPassword = form.getfirst('cPassword', "")
    r_value = collation(cId, cPassword)
    #output = loginResultHTML(r_value)
    output = str(r_value) + "login-id: " + cId
    status = '302 Found'
    if r_value:     # ログイン成功時の処理
        print ("login success")
        cookie = create_cookie(cId)
        response_headers = [('Location', '/menu'),
                            ('Set-Cookie', cookie["session"].OutputString()),
                            ('Set-Cookie', cookie["user_id"].OutputString())]
    else:           # ログイン失敗時の処理
        print ("login error")
        response_headers = [('Location', '/login')]
    start_response(status, response_headers)
    return output.encode()

def collation(cId, cPassword):
    """
    照合メソッド
    :param cId: ログインID
    :param cPassword: ログインパスワード
    :return:ログインが成功した場合true, 失敗した場合false
    """
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor(dictionary=True)
    stmt = (
        'SELECT user_id, password FROM user '
        'WHERE user_id=%s'
    )
    cur.execute(stmt, (cId,))
    user_info = cur.fetchone()
    if user_info is None:   # cIdに合致するユーザ情報がなかった場合
        print ('[login-error]: not exist user_id', cId)
        return False
    if user_info['password'] != cPassword:  # 入力されたパスワードが不正な場合
        print ('[login-error]: wrong password', cId, cPassword)
        return False
    print ('[login-success]:', cId)
    cur.close()
    connect.close()
    return True

