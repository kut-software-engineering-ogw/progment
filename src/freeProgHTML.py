#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
# 作成者　別役速斗　作成日 2015/1/5
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
from jinja2 import Environment, FileSystemLoader
import cgi

# テンプレのあるディレクトリとエンコードを指定
env = Environment(loader=FileSystemLoader('/var/www/cgi-bin', encoding=('utf8')))

def freeProgHTML_app(environ, start_response, cookie):
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgId', None)

    output = freeProgHTML(prgId, cookie['user_id'].value)
    status = "200 OK"
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, headers)
    return output

def expProgHTML_app(environ, start_response, cookie):
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgId', None)

    output = expProgHTML(prgId, cookie['user_id'].value)
    status = "200 OK"
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, headers)
    return output

def editProgHTML_app(environ, start_response, cookie):
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('prgId', None)

    output = editProgHTML(prgId, cookie['user_id'].value)
    status = "200 OK"
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, headers)
    return output

def userApp_app(environ, start_response, cookie):
    output = userApp(cookie['user_id'].value)
    status = "200 OK"
    headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
    start_response(status, headers)
    return output

def __getStr(bufStr, split):
    startIndex = bufStr.index('#'+split+'#') + len(split) + 3
    endIndex = bufStr.index('#'+split+'END#') - 1

    return bufStr[startIndex:endIndex]

# freeプログラム画面を生成する関数。
def freeProgHTML(prgId, userId):

    # テンプレートファイルの指定
    tpl = env.get_template('tmpl/free.tmpl')

    # ユーザの保存しているデータの一覧を取得
    savedDataList = prgNameGet(userId)

    # prgIdがNoneの時は、保存データを読まずにレンダリング
    if prgId is None:
        html = tpl.render({'userId':userId,'savedDataList':'','prgName':'','comment':'','prgData':''}).encode('utf-8')
        return html
    
    # ユーザの保存しているデータ本体を取得
    prgDataStr = prgDataGet(prgId)
    # 改行コードをCR+LFに変換
    #prgDataStr.replace(('\r'or'\n'), '\r\n')

    # ここから文字列を解析し、必要なデータに分割していく
    bufList = prgDataStr.split('\n', 2)   # 一行目、二行目、それ以降の３つのリストに分割
    prgName = bufList[1]    # プログラム名は二行目に存在する
    # コメントを取得
    bufStr = bufList[2]
    index = bufStr.index('#Program#')    # プログラムデータの始まりを探し、indexを取得
    comment = bufStr[:index-1]    # コメントを取得
    # プログラムデータを取得
    startIndex = index + 10  # インデックスに10を足して、データの先頭を指すように
    endIndex = bufStr.index('#ProgramEND#')
    prgData = bufStr[startIndex:endIndex-1]
    
    html = tpl.render({'userId':userId,'savedDataList':savedDataList,'prgName':prgName,'comment':comment,'prgData':prgData}).encode('utf-8')
    html = "test".encode()
    return html

# 課題プログラム画面を生成する関数。
def expProgHTML(environ, userId):

    # テンプレートファイルの指定
    tpl = env.get_template('free.tmpl')     # ファイル名はまだわからん

    # ユーザの保存しているデータの一覧を取得
    savedDataList = prgNameGet(userId)

    # ユーザの保存しているデータ本体を取得
    prgDataStr = prgDataGet(prgId)
    # 改行コードをCR+LFに変換
    #prgDataStr.replace(('\r'or'\n'), '\r\n')

    # ここから文字列を解析し、必要なデータに分割していく
    bufList = prgDataStr.split('\n', 2)   # 一行目、二行目、それ以降の３つのリストに分割
    prgName = bufList[1]    # プログラム名は二行目に存在する
    # コメントを取得
    bufStr = bufList[2]
    comment = __getStr(bufStr, 'Comment')    # コメントを取得
    # ヘルプメニューを取得
    help = __getStr(bufStr, 'Help')
    # ワークスペースの内容を取得
    prgData = __getStr(bufStr, 'Program')
    # 実行結果を取得
    result = __getStr(bufStr, 'Result')
    # 制限ブロックの情報を取得
    bufList = prgDataStr.rsplit('\n', 1)
    bufStr = bufList[1]
    limitedBlocks = bufStr.split(',')

    html = tpl.render({'userId':userId,'savedDataList':savedDataList,'prgName':prgName,'comment':comment,'prgData':prgData,
                       'help':help,'result':result,'limitedBlocks':LimitedBlocks}).encode('utf-8')

    return html

# 課題エディット画面を生成する関数。
def editProgHTML(environ, userId):

    # テンプレートファイルの指定
    tpl = env.get_template('free.tmpl')     # ファイル名はまだわからん

    # ユーザの保存しているデータの一覧を取得
    savedDataList = prgNameGet(userId)

    # ユーザの保存しているデータ本体を取得
    prgDataStr = prgDataGet(prgId)
    # 改行コードをCR+LFに変換
    #prgDataStr.replace(('\r'or'\n'), '\r\n')

    # ここから文字列を解析し、必要なデータに分割していく
    bufList = prgDataStr.split('\n', 2)   # 一行目、二行目、それ以降の３つのリストに分割
    prgName = bufList[1]    # プログラム名は二行目に存在する
    # コメントを取得
    bufStr = bufList[2]
    comment = __getStr(bufStr, 'Comment')    # コメントを取得
    # ヘルプメニューを取得
    help = __getStr(bufStr, 'Help')
    # ワークスペースの内容を取得
    prgData = __getStr(bufStr, 'Program')
    # 実行結果を取得
    result = __getStr(bufStr, 'Result')
    # 制限ブロックの情報を取得
    bufList = prgDataStr.rsplit('\n', 1)
    bufStr = bufList[1]
    limitedBlocks = bufStr.split(',')

    html = tpl.render({'userId':userId,'savedDataList':savedDataList,'prgName':prgName,'comment':comment,'prgData':prgData,
                       'help':help,'result':result,'limitedBlocks':LimitedBlocks}).encode('utf-8')

    return html

# ユーザ管理画面を生成する関数。
def userApp(mstUsrId):

    tpl = env.get_template('')
    
    userList = usrDataGet(mstUsrId)

    html = tpl.render({'userList':userList,'mstUsrId':mstUsrId}).encode('utf-8')
    return html
