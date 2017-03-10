#encoding: utf-8

"""
   author: Gupern
   create_date: 2017-2-21
   last_modified: 2017-2-21
   this is the update_tour_guide_words_api

   有待优化: 1. 写出一个界面
            2. 加上密码保护防止黑客盗用
            3. 增加从文件import功能, 方便添加字典

   :return: string
"""

import json
from pymongo import UpdateOne
from pymongo.errors import InvalidOperation
from util import mongo_util
import flask
from flask import Flask,request
app = Flask(__name__)



# connect database
db = mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')
garbage_col = 'tour_guides_words'
garbage_cursor = db[garbage_col]

# insert key of tour guides words

@app.route('/add_tour_guides_words',methods=['POST','GET'])

def add_tour_key():

    tour_guides_word = request.args.get(u'tour_guides_word',u'导游')

    # 查看是否已有此单词
    flag = garbage_cursor.find({'tour_guides_word':tour_guides_word})
    if flag.count():
        # 若已存在, 则返回已经存在
        return '已存在此单词'


    else:
        # 若没有, 则插入新单词
        result = garbage_cursor.insert_one(
            {
                'tour_guides_word': tour_guides_word
            }
        )
        return '添加成功'


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3002)
