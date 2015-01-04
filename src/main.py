#!/usr/local/bin/python3
# coding:utf-8
import Cookie
import sys

sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')
from collation import collation_app
from link_response import javascript, css
from session import get_session_info

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
            output = menu(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/freeProg":   # フリープログラミング画面のURL
            output = freeProgHTML(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/freeProg/prgDelete":     # プログラムデータ削除モジュール
            output = prgDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/freeProg/prgTableInsert":    # プログラムデータ追加モジュール
            output = prgTableInsert()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/freeProg/prgUpdate":    # プログラムデータ編集モジュール
            output = prgUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/expProg":    # 課題プログラム生成モジュールを呼び出す
            output = expProgHTML()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/expEdit":    # 課題エディット画面生成モジュールを呼び出す
            output = expEdit()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/expEdit/expTableInsert":     # 課題エディットデータ追加モジュールを呼び出す
            output = expTableInsert()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/expEdit/expDelete":  # 課題エディットデータ削除モジュールを呼び出す
            output = expDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/expEdit/expUpdate":  # 課題エディットデータ編集モジュールを呼び出す
            output = expUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/users":   # ユーザ管理画面生成モジュールを呼び出す
            output = usersHTML()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/users/usrAppend":    # ユーザ追加モジュールを呼び出す
            output = usrAppend()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/users/usrDelete":    # ユーザ削除モジュールを呼び出す
            output = usrDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/users/usrUpdate":    # ユーザ編集モジュールを呼び出す
            output = usrUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            status = '200 OK'
            start_response(status, response_headers)
            return [output]
        elif path == "/login":  # セッションありで/loginにアクセスしてきた場合
            status = '302 Found'
            response_headers = [('Location', '/menu')] # menuページヘのリダイレクト
            start_response(status, response_headers)
            return [""]
        else:
            pass
    elif path == '/collation':   # 照合へのリクエストの場合
            return [collation_app(environ, start_response)]
    elif path == '/login':  # urlが"/login"である場合
        output = loginHTML(environ, start_response)
        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
    else:   # cookieが無くurlが"/login"以外の場合
        status = '302 Found'
        response_headers = [('Location', '/login')] # ログインページヘのリダイレクト
        start_response(status, response_headers)

    return [output]