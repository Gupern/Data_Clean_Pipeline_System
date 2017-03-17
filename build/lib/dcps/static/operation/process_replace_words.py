# -*- coding: utf-8 -*-

# connect local host MongoDB
import json
import re
from pymongo import UpdateOne
from pymongo.errors import InvalidOperation
from util import mongo_util


# 连接数据库, source_col是collection, dict_col是字典collection
db = mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')
# 字典的collection
dict_col = 'replace_sources_words'
# dict 用list只需要读取一次, 更快
dict_cursor_all = list(db[dict_col].find())
dict_cursor = db[dict_col]

# 待处理数据的collection
source_col = 'guidetrip'
source_cursor = db[source_col]
source_cursor_all = db[source_col].find({'productType':1})

for i in source_cursor_all:
    _id = i['_id']
    # 替换数据源文字
    for j in dict_cursor_all:
        # title
        try:
            if j['replace_sources_words'] in i['title']:
                new_str = i['title'].replace(j['replace_sources_words'],u'马踏飞燕')
                try:
                    source_cursor.update_one(
                        {"_id": _id},
                        {
                            '$set': {
                                'title': new_str
                            }
                        }
                    )
                except:
                    print 'something error'
        except:
            print 'id: ' + str(i['_id']) + '\'s \'title\' is wrong'
            continue
        # name
        try:
            if j['replace_sources_words'] in i['name']:
                _id = i['_id']
                new_str = i['name'].replace(j['replace_sources_words'],u'马踏飞燕')
                source_cursor.update_one(
                        {"_id": _id},
                        {
                            '$set': {
                                'name': new_str
                            }
                        }
                    )
        except:
            print 'id: ' + str(i['_id']) + '\'s \'name\' is wrong'
            continue
        # description
        try:
            if j['replace_sources_words'] in i['description']:
                new_str = i['description'].replace(j['replace_sources_words'],u'马踏飞燕')
                try:
                    source_cursor.update_one(
                        {"_id": _id},
                        {
                            '$set': {
                                'description': new_str
                            }
                        }
                    )
                except:
                    print 'something error'
        except:
            print 'id: ' + str(i['_id']) + '\'s \'description\' is wrong'
            continue

    # 替换微信和QQ, 手机号码
    if u'微信' in i['description']:
        i['description'].replace('\r\n','\n')
        print i['description']
        print i['_id']
        print '======================================='
        for j in i['description'].split('\n'):
            print j
            print '******'
        print '--------------------'
        m = re.findall(r"\+?\d{5,}",i['description'])
        if m:
            for j in n:
                new_str = i['description'].replace(j,u' 欢迎使用马踏飞燕app下订单,付款后可见')
                try:
                    source_cursor.update_one(
                        {"_id": _id},
                        {
                            '$set': {
                                'description': new_str
                            }
                        }
                    )
                except:
                    print 'update index 4 error'

        n = re.findall(r"[a-zA-Z]+[\d \_ \w]{4,}",i['description'])
        if n:
            for j in n:
                new_str = i['description'].replace(j,u' 欢迎使用马踏飞燕app下订单,付款后可见')
                try:
                    source_cursor.update_one(
                        {"_id": _id},
                        {
                            '$set': {
                                'description': new_str
                            }
                        }
                    )
                except:
                    print 'update index 5 error'

            print i['description']
