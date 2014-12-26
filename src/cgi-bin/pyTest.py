#!/usr/local/bin/python3
# -*- coding:utf-8 -*-
from func import func
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
from jinja2 import Environment, FileSystemLoader
import mysql.connector

connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='ogwMemberList')
cur = connect.cursor()
cur.execute('select name from ogwMemberList')
names = cur.fetchall()
cur.execute('select lab from ogwMemberList')
labs = cur.fetchall()

env = Environment(loader = FileSystemLoader('/var/www/cgi-bin', encoding=('utf8')))
tpl = env.get_template('template.html')

MEMBER = []
for name in names:
    for lab in labs:
        MEMBER.append({'name':name, 'lab':lab})
cur.close()
connect.close()

html = tpl.render({'team':'OGW', 'MEMBER':MEMBER}).encode('utf-8')

def application(environ, start_response):
    status = '200 OK'
    #output = '<h1>Hello, World!!</h1><h2><a href="http://localhost/func">func</a></h2>'
    #if environ['PATH_INFO'] == "/func":
    #output = func()
    headers = [('Content-type','text/html'), ('Content-Length',str(len(html)))]
    start_response(status,headers)
    return [html]
