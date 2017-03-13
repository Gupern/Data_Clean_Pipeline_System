# -*- coding: utf-8 -*-
"""
   author: Gupern
   create_date: 2017-2-21
   last_modified: 2017-2-21
   this is the process of re-filter.
   :return:
"""

# connect local host MongoDB
import json
from pymongo import UpdateOne
from pymongo.errors import InvalidOperation
from util import mongo_util
import sys
import time

start_time = time.time()
#print 'start_time ' + str(start_time)

# 连接数据库, source_col是collection, dict_col是字典collection
db = mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')
# 字典的collection
dict_col = 'tour_guides_words'
dict_cursor_all = db[dict_col].find()
dict_cursor = db[dict_col]

'''
    跟anti_spam的过程相反, 即target和source调换即可
'''

target_col = 'guidetrip'
target_cursor = db[target_col]
target_cursor_all = db[target_col].find()

# 待处理数据的collection
source_col = 'trash_for_anti_spam'
source_cursor = db[source_col]
source_cursor_all = db[source_col].find({'productType':1})

count = count_for_trash = 0


for j in source_cursor_all:
    # 每次遍历都重置save值
    save = False

    dict_cursor_all = db[dict_col].find()
    try:
        for i in dict_cursor_all:
            # 每个document是一个dict类型,如果里面没有name的key,则会报错
            try:
                key = i['tour_guides_word']
            except:
                continue

            if key in j['name']:
                save = True
                print 'name: ' + j['name']
                break
            elif key in j['description']:
                save = True
                print 'description: ' + j['description']
                break
            elif key in j['title']:
                save = True
                print 'title: ' + j['title']
                break
    except:
        continue

    # 记得加not, 代表只有Ture才能回到guidetrip表
    if not save:
        count += 1

    else:
        # 插入到垃圾回收collection
        try:
            target_cursor.insert(j)
        except:
            print 'already inserted'

        id = j['_id']
        print id

        # 删除此document
        result = source_cursor.delete_one({'_id':id})
        count_for_trash += 1
        print result.deleted_count

print '垃圾堆还剩下' + str(count) + '个, 从垃圾堆回收了' + str(count_for_trash) + '个'

end_time = time.time()
use_time = end_time - start_time
print 'used time: ' + str(use_time)