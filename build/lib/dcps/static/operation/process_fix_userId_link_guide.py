# encoding: utf-8
'''
    修复数据bug, 问题:guidetrip表中的导游数据中, 有些userId在User表中不存在
    即guidetrip::userId not in set(user::_id)
    process流程: 建立user::_id的集合set,

                将原来的status=0的都添加字段'oldStatus = 0'

                对于所有 guidetrip::userId中满足条件:productType{'$in':[1,2,3,4]} 且 crawled==True的,
                if not in set:
                    # 随便选个已存在的id替换?
                    status = 0

'''

import pymongo
from util import mongo_util

guide_client = mongo_util.get_mongo_client("mongodb://0.0.0.0:27017/",db='matafy')
guide_col = guide_client.guidetrip

users_client = mongo_util.get_mongo_client(db='sso')
users_col = users_client.users
# # 先对老的status==0的document进行标注, 方便以后查询
# countOfStatus = 0
# for j in guide_col.find({'status': 0}):
#     countOfStatus += 1
#     print 'countOfStatus: ' + str(countOfStatus)
#     idOfOldStatus = j.get('_id')
#     result = guide_col.update_one(
#         {'_id': idOfOldStatus},
#         {
#             '$set': {
#                 'oldStatus': 0
#             }
#         }
#     )
#     if result.modified_count:
#         print 'modify oldStatus==0 success'
#     # for i in guide_col.find({'_id':idOfOldStatus}):
#     #     print i.get('_id')





count = 0
# 建立User表的id的集合
users_id = set()
for i in users_col.find():
    id = i.get('_id')
    # print type(str(id))
    # print 'id: ' + str(id)
    users_id.add(str(id))
# print 'ids count: ' + str(len(users_id))
userId_count = 0
# 进行查找且更新
for j in guide_col.find({'crawled': True, 'status': 1}):
    # userId_count += 1
    # 要修改的是guidetrip中的document, 因此取_id
    userIdObj = j.get('_id')
    userId = str(j.get('userId'))
    if userId in users_id:
        userId_count += 1
        print userId_count
        # 进行更新, 将status设为0, 且OldStatus设为1
        # # result = guide_col.update_one(
        # #     {'_id': userIdObj},
        # #     {
        # #         '$set': {'oldStatus': 1, 'status': 0}
        # #     }
        # # )
        # if result.modified_count:
        #     print 'modefied success, _id:' + str(userId)
        # else:
        #     print userId_count

