# coding:utf-8
"""
エラーレスポンスモジュール
なんらかのエラーが発生した際にクライアントへエラーの情報を返却するモジュール
Version:        0.0.1
Author:         kouhei oosaki
Since:          2015/01/11
"""

def bad_request(environ, start_response):
    """
    400 Bad Request
    リクエスト内容になんらかの不正があった場合に呼び出される
    :param start_response:
    :return:
    """
    status = "400 Bad Request"
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    f = open(environ['DOCUMENT_ROOT'] + "/error/400_Bad_Request.html", 'r')
    return [f.read().encode()]


def forbidden(environ, start_response):
    """
    403 Forbidden
    リクエストされたリソースへアクセスするための権限がない場合などに呼び出される
    :param start_response:
    :return:
    """
    status = "403 Forbidden"
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    f = open(environ['DOCUMENT_ROOT'] + "/error/403_Forbidden.html", 'r')
    return [f.read().encode()]


def not_found(environ ,start_response):
    """
    404 Not Found
    :param start_response:
    :return:
    """
    start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
    return ['Not Found'.encode()]
