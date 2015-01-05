#!/usr/local/bin/python3
# coding:utf-8
import sys

sys.path.append('/var/www/cgi-bin')
from collation import collation_app
from cookie import get_cookie
from link_response import javascript, css
from freeProgHTML import freeProgHTML_app
from prgInsert import prg_insert_app
from prgDelete import prg_delete_app
from prgUpdate import prg_update_app
from expInsert import exp_insert_app
from expDelete import exp_delete_app
from expUpdate import exp_update_app
from sign_out import sign_out_app

def application(environ, start_response):
    """
    クライアントからリクエストを受けた際に呼び出されるメソッド
    """
    print ("------------------------------------------------------")
    path = environ['PATH_INFO']
    print ("[request-path]:", path)
    if "javascript/" in path:  # javascriptへの要求
        print ("[return]: javascript-file", path)
        return javascript(environ, start_response, path)
    elif "css/" in path: # cssへの要求
        print ("[return]: css-file", path)
        return css(environ, start_response, path)

    cookie = get_cookie(environ)

    if cookie is not None:  # セッションを持っている場合
        print ("[login-user]:", cookie['user_id'])
        if path == "/menu":   # メニュー画面のURL
            print ("[call-app]: menu-application")
            return [test_app(environ, start_response, "menu")]
            #return [menu_app(environ, start_response, cookie)]

        elif path == "/freeProg":   # フリープログラミング画面のURL
            print ("[call-app]: freeProg-application", cookie['user_id'].value)
            return [freeProgHTML_app(environ, start_response, cookie)]

        elif path == "/freeProg/prgInsert":     # プログラムデータ追加モジュール
            print ("[call-app]: freeProg-insert-application")
            return [prg_insert_app(environ, start_response, cookie['user_id'])]

        elif path == "/freeProg/prgDelete":   # プログラムデータ削除モジュール
            print ("[call-app]: freeProg-delete-application")
            return [prg_delete_app(environ, start_response)]

        elif path == "/freeProg/prgUpdate":   # プロウグラムデータ編集モジュール
            print ("[call-app]: freeProg-update-application")
            return [prg_update_app(environ, start_response)]

        elif path == "/expProg":    # 課題プログラム生成モジュール
            print ("[call-app]: expProg-application")
            return [test_app(environ, start_response, "expProg")]
            #return [expProgHTML(environ, start_response)]

        elif path == "/expEdit":    # 課題エディット画面生成モジュール
            print ("[call-app]: expEdit-application")
            return [test_app(environ, start_response, "expEdit")]
            #return [editProgHTML(environ, start_response)]

        elif path == "/expEdit/expTableInsert":    # 課題エディットデータ追加モジュール
            print ("[call-app]: expEdit-insert-application")
            return [exp_insert_app(environ, start_response, cookie['user_id'])]

        elif path == "/expEdit/expDelete":    # 課題エディットデータ削除モジュール
            print ("[call-app]: expEdit-application")
            return [exp_delete_app(environ, start_response)]

        elif path == "/expEdit/expUpdate":    # 課題エディット編集モジュール
            print ("[call-app]: expEdit-application")
            return [exp_update_app(environ, start_response)]

        elif path == "/users":   # ユーザ管理画面生成モジュール
            print ("[call-app]: users-application")
            return [test_app(environ, start_response, "users")]
            #return [users_app(environ, start_response)]

        elif path == "/login":  # セッションありで/loginにアクセスしてきた場合
            print ("[redirect]: /menu path=", path)
            status = '302 Found'
            response_headers = [('Location', '/menu')] # menuページヘのリダイレクト
            start_response(status, response_headers)
            return [""]

        elif path == "/signout":
            print ("[call-app]: sign-out")
            sign_out_app(environ, start_response, cookie)
            return []

        else:
            print ("[error-404]:", path)
            start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
            return ['Not Found']

    elif path == '/collation':   # 照合へのリクエストの場合
        return [collation_app(environ, start_response)]

    elif path == '/login':  # ログイン画面生成モジュール
        return [test_login_app(environ, start_response)]
        #return [login_app(environ, start_response)]
    else:   # cookieが無くurlが"/login"以外の場合
        print ("[redirect]: /login path=", path)
        status = '302 Found'
        response_headers = [('Location', '/login')]
        start_response(status, response_headers)
        return []

def test_app(environ, start_response, app_name):
    status = "200 OK"
    header = [('Content-Type', 'text/plain')]
    start_response(status, header)
    return app_name.encode()

def test_login_app(envrion, start_response):
    output = """
        <form action="/collation" method="POST">
        ログインID<input type="text" name="cId">
        パスワード<input type="text" name="cPassword">
        <input type="submit">
        </form>
    """
    status = '200 OK'
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, headers)
    return output.encode()
