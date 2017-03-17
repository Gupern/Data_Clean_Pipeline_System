#encoding: utf-8

"""
   author: Gupern
   create_date: 2017-2-20
   last_modified: 2017-2-20
   this is the update_garbage_dict api
   :return:
"""

import json
from pymongo import UpdateOne
from pymongo.errors import InvalidOperation
from util import mongo_util

# connect database
db = mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')
# garbage_col = 'tour_guides_words'
# garbage_col = 'replace_sources_words'
garbage_col = 'connecting_methods_words'
garbage_cursor = db[garbage_col]

# insert key of garbage

print '请输入新词,回车键结束.输入#则退出'

while True:
    tour_guides_word = raw_input()
    if tour_guides_word == '#':
        break

    result = garbage_cursor.insert_one(
                {
                    'connecting_methods_words': tour_guides_word
                }
             )
    print '输入成功,可继续添加,按#则退出'


