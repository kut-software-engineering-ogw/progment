#!/usr/local/python/bin/python3
# -coding:utf-8
import cgi
import sys

import mysql.connector

sys.path.append('/var/www/cgi-bin')
from cookie import get_cookie
from http_client_error import forbidden

def exp_update_handler(environ, start_response):
    """
    呼び出しメソッド
    """
    cookie = get_cookie(environ)
    if cookie is None:
        """ セッションを確立していない場合 """
        return forbidden(environ, start_response)
    else:
        """ セッションを確立している場合 """
        form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
        exp_id = form.getfirst('expId')
        exp_data = form.getfirst('workSpaceData')
        comment = form.getfirst('comment')
        help_menu = form.getfirst('helpMenu')
        result = form.getfirst('result')
        limit_blocks = form.getfirst('limitedBlocks')

        ret = expUpdate(exp_id, exp_data, comment, help_menu, result, limit_blocks)

        output = '{}'.format(ret)

        status = '200 OK'
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)

        return [output.encode()]


def expUpdate(exerciseId, exerciseData, com, hel, res, lim):
    expId = exerciseId
    expData = exerciseData
    comment = com
    helpStmt = hel
    result = res
    limitedBlocks = lim
    connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
    cur = connect.cursor()
    stmt = ("update exp_data " "set workspace = %s, comment = %s, help_menu = %s, result = %s, limit_num = %s " "where exp_id = %s")
    data = (expData, comment, helpStmt, result, limitedBlocks, expId)
    cur.execute(stmt, data)
    cur.close()
    connect.close()
    return "1"
