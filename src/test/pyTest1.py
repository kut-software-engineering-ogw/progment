#!/usr/local/bin/python3
# -*- coding:utf-8 -*-
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
cur.close()
connect.close()

env = Environment(loader = FileSystemLoader('/var/www/cgi-bin', encoding=('utf8')))
tpl = env.get_template('template0.tmpl')

MEMBER = []
for num in range(0, 8):
    MEMBER.append({'name':names[num], 'lab':labs[num]})
print(MEMBER)

html = tpl.render({'team':'OGW', 'MEMBER':MEMBER}).encode('utf-8')

def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-type','text/html'), ('Content-Length',str(len(html)))]
    start_response(status,headers)
    return [html]
