#!/usr/local/bin/python3
# coding:utf-8
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('/var/www/cgi-bin', encoding=('utf8')))
tpl = env.get_template('template0.tmpl')

MEMBER = []
MEMBER.append({'name':'Ogawa', 'lab':'IwataLab'})
MEMBER.append({'name':'Osaki', 'lab':'YokoyamaLab'})
MEMBER.append({'name':'Kawaguchi', 'lab':'YokoyamaLab'})
MEMBER.append({'name':'Becchaku', 'lab':'YokoyamaLab'})
MEMBER.append({'name':'Ueda', 'lab':'UgawaLab'})
MEMBER.append({'name':'Takamatsu', 'lab':'UgawaLab'})
MEMBER.append({'name':'Hatanaka', 'lab':'MatsuzakiLab'})
MEMBER.append({'name':'Matsumoto', 'lab':'MatsuzakiLab'})
for member in MEMBER:
    print(member)
html = tpl.render({'team':'OGW', 'MEMBER':MEMBER}).encode('utf-8')

def application (environ, start_response):
    status = '200 OK'
    #output = '<h1>Hello World!</h1>'
    response_headers = [('Content-type','text/html'), ('Content-Length',str(len(html)))]
    start_response(status,response_headers)
    return [html]
