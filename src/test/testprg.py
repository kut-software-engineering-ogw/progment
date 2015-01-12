#!/usr/local/bin/python3
# -*- coding: utf-8 -*-

def __getStr(bufStr, split):
    startIndex = bufStr.index('#'+split+'#') + len(split) + 3
    endIndex = bufStr.index('#'+split+'END#') - 1

    return bufStr[startIndex:endIndex]

testStr = '''ID
プログラム名
#Comment#
コメント
#CommentEND#
#Help#
ヘルプメニュー
#HelpEND#
#Program#
ワークスペースの内容
・・・
#ProgramEND#
#Result#
実行結果
#ResultEND#
10,121,1,2,3,4,5'''


userId = 'ririkaru'
# ユーザの保存しているデータ本体を取得
prgDataStr = testStr

# ここから文字列を解析し、必要なデータに分割していく
bufList = prgDataStr.split('\n', 2)   # 一行目、二行目、それ以降の３つのリストに分割
prgName = bufList[1] # プログラム名は二行目に存在する
# コメントを取得
bufStr = bufList[2]
comment = __getStr(bufStr, 'Comment') # コメントを取得
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

print(userId)
print()
print(prgName)
print()
print(comment)
print()
print(help)
print()
print(prgData)
print()
print(result)
print()
print(limitedBlocks)


