#!/usr/local/bin/python3
# coding:utf-8
import Cookie
def application(environ, start_response):
    # cookieの確認を行う
    cookie = Cookie.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    status = ""
    output = ""
    path = environ['PATH_INFO']
    if not(cookie.has_key("session")) and not(path == '/login'): # cookieが無くurlが"/login"ではない場合の処理
        status = '302 Found'
        response_headers = [('Location', 'http://localhost/login')] # ログインページヘのリダイレクト
        start_response(status, response_headers)
    elif not(cookie.has_key("session")) and (path == '/login'): # cookieが無くurlが"/login"の場合の処理
        output = login(environ, start_response)
        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
    else:
        if path == '/collation': # 照合
            output == collation(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/menu": # メニュー画面のURL
            output == menu(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == ""

    return [output]