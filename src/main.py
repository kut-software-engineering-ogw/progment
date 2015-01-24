#!/usr/local/bin/python3
# coding:utf-8
import sys

sys.path.append('/var/www/cgi-bin')
sys.path.append('/var/www/cgi-bin/python')
from link_response import javascript, css, img
from login import login_handler
from freeProgHTML import freeProgHTML_handler, expProgHTML_handler, editProgHTML_handler
from prgInsert import prg_insert_handler
from prgDelete import prg_delete_handler
from prgUpdate import prg_update_handler
from expInsert import exp_insert_handler
from expDelete import exp_delete_handler
from expUpdate import exp_update_handler
from logout import logout_handler

document_root = '/var/www/cgi-bin'

def application(environ, start_response):
    """
    クライアントからリクエストを受けた際に呼び出されるメソッド
    """
    print ("------------------------------------------------------")
    environ.update({'DOCUMENT_ROOT': document_root})
    path = environ['PATH_INFO']
    print ("[request-path]:", path)
    if "javascript/" in path:
        """ javascript """
        return javascript(environ, start_response, path)

    elif "css/" in path:
        """ css """
        return css(environ, start_response, path)

    elif "img/" in path:
        """ 画像ファイル """
        return img(environ, start_response, path)

    elif path == '/login':
        """ ログインハンドラモジュール """
        return login_handler(environ, start_response)

    elif path == "/menu":
        """ HTMLレスポンスモジュール呼び出し """
        return test_app(environ, start_response, "menu")

    elif path == "/freeProg":
        """ フリープログラミング画面生成モジュール呼び出し """
        print ("[call-app]: freeProg-application")
        return freeProgHTML_handler(environ, start_response)

    elif path == "/freeProg/prgInsert":
        """ プログラムデータ保存モジュール呼び出し """
        return prg_insert_handler(environ, start_response)

    elif path == "/freeProg/prgDelete":
        """ プログラムデータ削除モジュール """
        return prg_delete_handler(environ, start_response)

    elif path == "/freeProg/prgUpdate":
        """ プロウグラムデータ編集モジュール """
        return prg_update_handler(environ, start_response)

    elif path == "/expProg":
        """ 課題プログラム生成モジュール """
        return expProgHTML_handler(environ, start_response)

    elif path == "/expEdit":
        """ 課題エディット画面生成モジュール """
        return editProgHTML_handler(environ, start_response)

    elif path == "/expEdit/expTableInsert":
        """ 課題エディットデータ追加モジュール """
        return exp_insert_handler(environ, start_response)

    elif path == "/expEdit/expDelete":    # 課題エディットデータ削除モジュール
        return exp_delete_handler(environ, start_response)

    elif path == "/expEdit/expUpdate":    # 課題エディット編集モジュール
        return exp_update_handler(environ, start_response)

    elif path == "/users":   # ユーザ管理画面生成モジュール
        return test_app(environ, start_response, "users")

    elif path == "/logout":
        return logout_handler(environ, start_response)

    elif path == "/post_test":
        return post_test(environ, start_response)

    elif path == "/":
        print ("[redirect]: /login path=", path)
        status = '302 Found'
        response_headers = [('Location', '/login')]
        start_response(status, response_headers)
        return []

    else:
        print ("[error-404]:", path)
        start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
        return ['Not Found'.encode()]

def test_app(environ, start_response, app_name):
    output = """
        <form action="/menu" method="POST">
        <a href="../freeProg">フリープログラミング</a><br>
        </form>
    """
    status = "200 OK"
    #header = [('Content-Type', 'text/plain')]
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    #start_response(status, header)
    start_response(status, headers)
    return [output.encode()]

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
    return [output.encode()]

def post_test(environ, start_response):
    output = '''
        <form action="/expEdit/expDelete" method="POST">
            課題ID<input type="text" name="expId" >
            <input type="submit" >
        </form>
    '''
    status = '200 OK'
    headers = [('Content-type', 'text/html')]
    start_response(status, headers)
    return [output.encode()]
