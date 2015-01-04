# coding:utf-8
"""
linkタグによってリクエストされるリソースを返却するメソッド
"""

import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
sys.path.append('/var/www/cgi-bin')

def css(environ, start_response, path):
    status = "200 OK"
    response_headers = [('Content-type', 'text/css')]
    start_response(status, response_headers)
    f2serv=open("/var/www/cgi-bin" + path, 'r')
    return environ['wsgi.file_wrapper'](f2serv)

def javascript(environ, start_response, path):
    status = "200 OK"
    response_headers = [('Content-type', 'text/javascript')]
    start_response(status, response_headers)
    f2serv=open("/var/www/cgi-bin" + path, 'r')
    return environ['wsgi.file_wrapper'](f2serv)

