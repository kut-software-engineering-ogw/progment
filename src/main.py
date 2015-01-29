#!/usr/local/bin/python3
# coding:utf-8
import sys

sys.path.append('/var/www/cgi-bin')
sys.path.append('/var/www/cgi-bin/python')
from link_response import javascript, css, img, html
from login import login_handler
from menu import menu_handler
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
        return menu_handler(environ, start_response)

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

    elif path == "/users":
        """ ユーザ画面 """
        return html(environ, start_response, '/html/users.html')

    elif path == "/logout":
        return logout_handler(environ, start_response)

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