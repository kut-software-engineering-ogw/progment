#!/usr/local/bin/python3
# coding:utf-8
import Cookie
import sys

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')
from collation import collation_app
from link_response import javascript, css
from session import get_session_info
from freeProgHTML import freeProgHTML, expProgHTML, editProgHTML
from prgInsert import prg_insert_app
from prgDelete import prg_delete_app
from prgUpdate import prg_update_app
from expInsert import exp_insert_app
from expDelete import exp_delete_app
from expUpdate import exp_update_app

def application(environ, start_response):
    """
    クライアントからリクエストを受けた際に呼び出されるメソッド
    """
    path = environ['PATH_INFO']
    print ("[request-path]:", path)

    if "/javascript" in path:  # javascriptへの要求
        print ("[return]: javascript-file", path)
        return javascript(environ, start_response, path)
    elif "/css" in path: # cssへの要求
        print ("[return]: css-file", path)
        return css(environ, start_response, path)

    cookie = Cookie.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    session_info = get_session_info(cookie)

    if session_info is not None:  # セッションを持っている場合
        if path == "/menu":   # メニュー画面のURL
            print ("[call-app]: menu-application")
            return [menu_app(environ, start_response)]

        elif path == "/freeProg":   # フリープログラミング画面のURL
            print ("[call-app]: freeProg-application")
            return [freeProgHTML(environ, start_response)]

        elif path == "/freeProg/prgInsert":     # プログラムデータ追加モジュール
            print ("[call-app]: freeProg-insert-application")
            return [prg_insert_app(environ, start_response, session_info)]

        elif path == "/freeProg/prgDelete":   # プログラムデータ削除モジュール
            print ("[call-app]: freeProg-delete-application")
            return [prg_delete_app(environ, start_response)]

        elif path == "/freeProg/prgUpdate":   # プロウグラムデータ編集モジュール
            print ("[call-app]: freeProg-update-application")
            return [prg_update_app(environ, start_response)]

        elif path == "/expProg":    # 課題プログラム生成モジュールを呼び出す
            print ("[call-app]: expProg-application")
            return [expProgHTML(environ, start_response)]

        elif path == "/expEdit":    # 課題エディット画面生成モジュールを呼び出す
            print ("[call-app]: expEdit-application")
            return [editProgHTML(environ, start_response)]

        elif path == "/expEdit/expTableInsert":    # 課題エディットデータ追加モジュール
            print ("[call-app]: expEdit-insert-application")
            return [exp_insert_app(environ, start_response, session_info)]

        elif path == "/expEdit/expDelete":    # 課題エディットデータ削除モジュール
            print ("[call-app]: expEdit-application")
            return [exp_delete_app(environ, start_response)]

        elif path == "/expEdit/expUpdate":    # 課題エディット編集モジュール
            print ("[call-app]: expEdit-application")
            return [exp_update_app(environ, start_response)]

        elif path == "/users":   # ユーザ管理画面生成モジュールを呼び出す
            print ("[call-app]: users-application")
            return [users_app(environ, start_response)]

        elif path == "/login":  # セッションありで/loginにアクセスしてきた場合
            print ("[redirect]: /menu path=", path)
            status = '302 Found'
            response_headers = [('Location', '/menu')] # menuページヘのリダイレクト
            start_response(status, response_headers)
            return [""]

        else:
            print ("[error-404]:", path)
            start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
            return ['Not Found']

    elif path == '/collation':   # 照合へのリクエストの場合
        return [collation_app(environ, start_response)]

    elif path == '/login':  # ログイン画面生成モジュール
        return [login_app(environ, start_response)]

    else:   # cookieが無くurlが"/login"以外の場合
        print ("[error-404]:", path)
        start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
        return ['Not Found']