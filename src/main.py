#!/usr/local/bin/python3
# coding:utf-8
import Cookie
import cgi
def application(environ, start_response):
    # cookieの確認を行う
    cookie = Cookie.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    status = ""
    output = ""
    path = environ['PATH_INFO']
    if cookie.has_key("session"):  # cookieを持っている場合
        if path == '/collation':   # 照合
            form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
            cId = form.getfirst('cId')
            cPassword = form.getfirst('cPassword')
            result = collation(cId, cPassword)
            output, cookie = loginResultHTML(result)
            status = '200 OK'
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            start_response(status, response_headers)
        elif path == "/menu":   # メニュー画面のURL
            output = menu(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/freeProg":   # フリープログラミング画面のURL
            output = freeProgHTML(environ, start_response)
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/freeProg/prgDelete":     # プログラムデータ削除モジュール
            output = prgDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/freeProg/prgTableInsert":    # プログラムデータ追加モジュール
            output = prgTableInsert(prgId, prgName, )
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/freeProg/prgUpdate":    # プログラムデータ編集モジュール
            output = prgUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/expProg":    # 課題プログラム生成モジュールを呼び出す
            output = expProgHTML()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/expEdit":    # 課題エディット画面生成モジュールを呼び出す
            output = expEdit()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/expEdit/expTableInsert":     # 課題エディットデータ追加モジュールを呼び出す
            output = expTableInsert()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/expEdit/expDelete":  # 課題エディットデータ削除モジュールを呼び出す
            output = expDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path == "/expEdit/expUpdate":  # 課題エディットデータ編集モジュールを呼び出す
            output = expUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path = "/users":   # ユーザ管理画面生成モジュールを呼び出す
            output = usersHTML()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path = "/users/usrAppend":    # ユーザ追加モジュールを呼び出す
            output = usrAppend()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif path = "/users/usrDelete":    # ユーザ削除モジュールを呼び出す
            output = usrDelete()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        elif paht = "/users/usrUpdate":    # ユーザ編集モジュールを呼び出す
            output = usrUpdate()
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        else:
            pass

    elif path == '/login':  # urlが"/login"である場合
        output = loginHTML(environ, start_response)
        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
    else:   # cookieが無くurlが"/login"以外の場合
        status = '302 Found'
        response_headers = [('Location', 'http://localhost/login')] # ログインページヘのリダイレクト
        start_response(status, response_headers)

    return [output]