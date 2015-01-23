# coding:utf-8
"""
リダイレクションモジュール
リダイレクションを発生させるレスポンスを行う
Author:     kouhei oosaki
Since:      2015/01/23
Version:    0.0.1
"""

def found(url, environ, start_response):
    """
    302 Found
    :param url: リダイレクト先のURL
    :param environ:
    :param start_response:
    :return: 空文字列
    """
    status = '302 Found'
    response_headers = [('Location', url)]
    start_response(status, response_headers)
    return []
