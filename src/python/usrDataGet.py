#!/usr/local/python/bin/python3
# -*-coding:utf-8-*-
import mysql.connector
# in: usrId, out: prgNameList

#def usrDataGet(mstUsrId):
mstUsrId = '00000000000'
connect = mysql.connector.connect(user='root', password='root00', host='127.0.0.1', database='progment')
cur = connect.cursor()
cur.execute("select stdData.user_id from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
usrIds = cur.fetchall()
cur.execute("select user_name from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
usrNames = cur.fetchall()
cur.execute("select grade from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
grades = cur.fetchall()
cur.execute("select class from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
classes = cur.fetchall()
cur.execute("select student_number from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
stdNum = cur.fetchall()
cur.execute("select usrData.grouping from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
groups = cur.fetchall()
cur.execute("select usrData.password from stdData " "inner join usrData on stdData.user_id = usrData.user_id " "where stdData.master_user_id = "+ mstUsrId)
passwords = cur.fetchall()
cur.close()
connect.close()
count = int(len(usrIds))
print(count)
stdDataList = []
for num in range(0, count):
    stdDataList.append({'usrId':usrIds[num], 'usrName':usrNames[num], 'grade':grades[num], 'class':classes[num], 'stuNum':stdNum[num], 'group':groups[num], 'password':passwords[num]})
print(stdDataList)
#return prgNameList
