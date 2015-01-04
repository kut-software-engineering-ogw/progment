#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
import sys
sys.path.append('/usr/local/python/lib/python3.4/site-packages')
from jinja2 import Environment, FileSystemLoader
import http.cookies
import cgi, cgitb
egitb.enable()


# テンプレのあるディレクトリとエンコードを指定
env = Environment(loader=FileSystemLoader('/var/www/cgi-bin', encoding=('utf8')))

def __getStr(bufStr, split):
    startIndex = bufStr.index('#'+split+'#') + len(split) + 3
    endIndex = bufStr.index('#'+split+'END#') - 1

    return bufStr[startIndex:endIndex]

def freeProgHTML(environ, start_response):

    # テンプレートファイルの指定
    tpl = env.get_template('free.tmpl')

    # CookieからユーザIDを取得
    cookie = http.cookies.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    userId = cookie['user_id'].value

    # 入力値（作業ID）を取得
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('value', '0')     # valueに関連付けられた値を取得。なければ0を返す



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
    index = bufStr.index('#Program#')    # プログラムデータの始まりを探し、indexを取得
    comment = bufStr[:index-1]    # コメントを取得
    # プログラムデータを取得
    startIndex = index + 10  # インデックスに10を足して、データの先頭を指すように
    endIndex = bufStr.index('#ProgramEND#')
    prgData = bufStr[startIndex:endIndex-1]

    html = tpl.render({'userId':userId,'savedDataList':savedDataList,'prgName':prgName,'comment':comment,'prgData':prgData}).encode('utf-8')

    return html

def expProgHTML(environ):

    # テンプレートファイルの指定
    tpl = env.get_template('free.tmpl')     # ファイル名はまだわからん

    # CookieからユーザIDを取得
    cookie = http.cookies.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    userId = cookie['user_id'].value

    # 入力値（作業ID）を取得
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('value', '0')     # valueに関連付けられた値を取得。なければ0を返す



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

def editProgHTML(environ):

    # テンプレートファイルの指定
    tpl = env.get_template('free.tmpl')     # ファイル名はまだわからん

    # CookieからユーザIDを取得
    cookie = http.cookies.SimpleCookie()
    cookie.load(environ['HTTP_COOKIE'])
    userId = cookie['user_id'].value

    # 入力値（作業ID）を取得
    form = cgi.FieldStorage(environ=environ, fp=environ['wsgi.input'])
    prgId = form.getfirst('value', '0')     # valueに関連付けられた値を取得。なければ0を返す



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