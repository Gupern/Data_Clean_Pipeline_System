#encoding: utf-8
"""
   author: Gupern 
   create_date: 2017-2-17
   last_modified: 2017-2-21
   this is the update_garbage_dict api
   :return:
"""

import json
from pymongo import UpdateOne
from pymongo.errors import InvalidOperation
from util import mongo_util
from flask import Flask,request, url_for
# from flask.ext.api import FlaskAPI

app = Flask(__name__)

# connect database
db = mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')
garbage_col = 'garbage_dict'
garbage_cursor = db[garbage_col]

# insert key of garbage

@app.route('/',methods=['GET','POST'])
def update_garbage_dict():

    print '请输入新词,回车键结束.输入#则退出'
    while True:
        garbage_word = raw_input()

        if garbage_word == '#':
            break
        result = garbage_cursor.insert_one(
                    {
                        'garbage_word': garbage_word
                    }
                )

        print '输入成功,可继续添加,按#则退出'
    return 'lalalal'
if __name__ == '__main__':
    app.run(debug=True)

