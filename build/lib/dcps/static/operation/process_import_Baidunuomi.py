# encoding: utf-8
'''
    This is a script for import document from Baidunuomi to guidetrip
    There are some notes:
        1. add some items, such as productType: 4 and other default items.
        2. select user _id from Users collection randomly and set it to the default UserId field.
        3. bulk_write import
'''
import datetime
import pymongo
from util import mongo_util
import random

# 连接sso::users
user_client = mongo_util.get_mongo_client(db='sso')
user_col = user_client.users
user_cursor = user_col.find()

# 连接matafy::guidetrip
guidetrip_client = mongo_util.get_mongo_client()
guidetrip_col = guidetrip_client.guidetrip
guidetrip_cursor = guidetrip_col.find(({'productType':4, 'crawled': True}))

# 连接test:baidunuomi (已经导入到本地)
sicai_client = mongo_util.get_mongo_client(db='test')
tmp_col = sicai_client.tmp
sicai_col = sicai_client.baiduluomi
sicai_cursor = sicai_col.find()

# sample是随机取样
random1 = guidetrip_col.aggregate(
    [{'$sample':{'size':50}}]
)

# 获得50个用户样本(随机), match为满足条件的
def get_random_user(num=50):
    return guidetrip_col.aggregate(
        [
            {'$match':{'productType':4, 'crawled':True}},
            {'$sample':{'size':num}}]
    )

# for i in random1:
    # print i.get('userId')

# 从sicai中读取, 并添加默认字段
count = 0
samples = list(get_random_user(6500))

for i in sicai_cursor:
    # count += 1
    # print str(len(samples)) + '      '+ str(count)

    # 获取各种参数

    # images + 水印
    images_old = i.get('imgage_ali')
    images = [('%s%s' % (image, '?x-oss-process=style/watermark')) for image in images_old]


    # iconUrl default icon 不加水印
    iconUrl = images[0]

    # productType 私菜是第四
    productType = 4

    # gender
    gender = ' '

    # status
    status = 0

    # price
    price = i.get('price')

    # feeContain u'暂无'
    feeContain = u'暂无'

    # feeNotContain u'暂无'
    feeNotContain = u'暂无'

    # savedraft 1
    savedraft = 1


    # isAuth 1
    isAuth = 1

    # role 1
    role = 1

    # isOnline 1
    isOnline = 1

    # updateTime datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    updateTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # preDays 3
    preDays = 1

    # days 99
    days = 99

    # description = introduce
    description = i.get('introduce')


    # crawled True
    crawled = True



    # 得到shop, 如果有shop, 则执行, 因为有嵌套, 所以在shop内的变量设置在下面的循环里
    shops = i.get('shops')
    len_shops = len(shops)


    # # update_bulk_write
    # requests = []
    # print count
    # if count != 0:
    #     tmp_col.bulk_write(requests)
    # tmp_col.insert_many( [{ 'insertOne' : { "document" : 'aaa' } }] )
    # if count >= 1000:
    #     try:
    #         # guidetrip_col.bulk_write(requests)
    #         tmp_col.bulk_write(requests)
    #         count = 0
    #         print count
    #     except:
    #         print 'hhhh'
    #         continue

    while len_shops != 0:

        # print shops[len_shops - 1]
        len_shops -= 1
        # shop 当前的店铺
        shop = shops[len_shops - 1]
        # title: shops里的店名
        title = shop['name']

        # tripPlan [dict(imageUrl=image_urls, pointDesc=description, pointName=title]
        tripPlan = [dict(imageUrl=images, pointDesc=description, pointName=title)]

        # userId sample.get('userId')
        # samples没了, 继续生成
        if len(samples) == 0:
            # 在内存允许的情况下, 越多越快, 这里设置6000
            samples = list(get_random_user(6000))
        # 获取新sample
        sample = samples.pop()
        userId = sample.get('userId')
        # print 'userId: ' +  sample.get('userId')

        # # name 私菜发布者姓名
        name = sample.get('name')
        # print name

        # city city.strip()
        # meetPlace city.strip()
        # location ' '
        try:
            meetPlace = city = shop['address'][:3]
            location = shop['address']
            # print city
        except:
            meetPlace = city =''
            location = ''
            continue
        # lat
        lat = shop['baidu_latitude']

        # lon
        lon = shop['baidu_longitude']

        # age
        age = 0

        # 建立新的文档
        # print type(i)
        i['userId'] = userId
        i['iconUrl'] = iconUrl
        i['name'] = name
        i['city'] = city
        i['productType'] = productType
        i['gender'] = gender
        i['title'] = title
        i['lat'] = lat
        i['lon'] = lon
        i['description'] = description
        i['images'] = images
        i['status'] = status
        i['price'] = price
        i['age'] = age
        i['feeContain'] = feeContain
        i['feeNotContain'] = feeNotContain
        i['savedraft'] = savedraft
        i['meetPlace'] = meetPlace
        i['location'] = location
        i['isAuth'] = isAuth
        i['role'] = role
        i['isOnline'] = isOnline
        i['updateTime'] = updateTime
        i['preDays'] = preDays
        i['days'] = days
        i['tripPlan'] = tripPlan
        i['crawled'] = crawled
        # print i
        del i['_id']


        try:
            tmp_col.insert_one(i)
        except:
            print 'asdfffffffffffffffff'
            continue
        count += 1
        print count


        # print(new_guide.__dict__)
        # gid = guides_db[guides_col].insert_one(new_guide.__dict__).inserted_id
        # print(str(gid) + "<><>gid<><>")
        #
        # """
        # processed flag
        # """
        # source_db[baixing_col].update({'_id': guide.get("_id")}, {"$set": {"processed": True}},
        #                               upsert=False)


