# coding:utf-8
"""
レスポンスモジュール
クライアントからの各種ファイル要求に対する
返答するモジュール
Author:     kouhei oosaki
Version:    0.0.2
Since:      2014/12/24
LastUpdate: 2015/01/23
"""
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def css(environ, start_response, path):
    """
    cssのレスポンスを行うメソッド
    """
    f2serv=open("/var/www/cgi-bin" + path, 'r')
    status = "200 OK"
    response_headers = [('Content-type', 'text/css')]
    start_response(status, response_headers)

    return environ['wsgi.file_wrapper'](f2serv)

def javascript(environ, start_response, path):
    """
    javascriptのレスポンスを行うメソッド
    """
    f2serv=open("/var/www/cgi-bin" + path, 'r')
    status = "200 OK"
    response_headers = [('Content-type', 'text/javascript')]
    start_response(status, response_headers)

    return environ['wsgi.file_wrapper'](f2serv)

def img(environ, start_response, path):
    """
    画像ファイルのレスポンスを行うメソッド
    """
    image = open('/var/www/cgi-bin' + path, 'r')
    status = "200 OK"
    response_headers = [('Content-type', 'img/png')]
    start_response(status, response_headers)

    return environ['wsgi.file_wrapper'](image)

def html(environ, start_response, path):
    """
    htmlファイルのレスポンスを行うメソッド
    """
    html = open('/var/www/cgi-bin' + path, 'r')
    status = "200 OK"
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)

    return environ['wsgi.file_wrapper'](html)