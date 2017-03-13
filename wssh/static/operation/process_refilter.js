function process_replace_words() {var code="#&nbsp;-*-&nbsp;coding:&nbsp;utf-8&nbsp;-*-<br>'''<br>&nbsp;&nbsp;&nbsp;author:&nbsp;Gupern<br>&nbsp;&nbsp;&nbsp;create_date:&nbsp;2017-2-21<br>&nbsp;&nbsp;&nbsp;last_modified:&nbsp;2017-2-21<br>&nbsp;&nbsp;&nbsp;this&nbsp;is&nbsp;the&nbsp;process&nbsp;of&nbsp;re-filter.<br>&nbsp;&nbsp;&nbsp;:return:<br>'''<br><br>#&nbsp;connect&nbsp;local&nbsp;host&nbsp;MongoDB<br>import&nbsp;json<br>from&nbsp;pymongo&nbsp;import&nbsp;UpdateOne<br>from&nbsp;pymongo.errors&nbsp;import&nbsp;InvalidOperation<br>from&nbsp;util&nbsp;import&nbsp;mongo_util<br>import&nbsp;sys<br>import&nbsp;time<br><br>start_time&nbsp;=&nbsp;time.time()<br>#print&nbsp;'start_time&nbsp;'&nbsp;+&nbsp;str(start_time)<br><br>#&nbsp;连接数据库,&nbsp;source_col是collection,&nbsp;dict_col是字典collection<br>db&nbsp;=&nbsp;mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')<br>#&nbsp;字典的collection<br>dict_col&nbsp;=&nbsp;'tour_guides_words'<br>dict_cursor_all&nbsp;=&nbsp;db[dict_col].find()<br>dict_cursor&nbsp;=&nbsp;db[dict_col]<br><br>'''<br>&nbsp;&nbsp;&nbsp;&nbsp;跟anti_spam的过程相反,&nbsp;即target和source调换即可<br>'''<br><br>target_col&nbsp;=&nbsp;'guidetrip'<br>target_cursor&nbsp;=&nbsp;db[target_col]<br>target_cursor_all&nbsp;=&nbsp;db[target_col].find()<br><br>#&nbsp;待处理数据的collection<br>source_col&nbsp;=&nbsp;'trash_for_anti_spam'<br>source_cursor&nbsp;=&nbsp;db[source_col]<br>source_cursor_all&nbsp;=&nbsp;db[source_col].find({'productType':1})<br><br>count&nbsp;=&nbsp;count_for_trash&nbsp;=&nbsp;0<br><br><br>for&nbsp;j&nbsp;in&nbsp;source_cursor_all:<br>&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;每次遍历都重置save值<br>&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;=&nbsp;False<br><br>&nbsp;&nbsp;&nbsp;&nbsp;dict_cursor_all&nbsp;=&nbsp;db[dict_col].find()<br>&nbsp;&nbsp;&nbsp;&nbsp;try:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;i&nbsp;in&nbsp;dict_cursor_all:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;每个document是一个dict类型,如果里面没有name的key,则会报错<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key&nbsp;=&nbsp;i['tour_guides_word']<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;except:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;key&nbsp;in&nbsp;j['name']:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;=&nbsp;True<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;'name:&nbsp;'&nbsp;+&nbsp;j['name']<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elif&nbsp;key&nbsp;in&nbsp;j['description']:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;=&nbsp;True<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;'description:&nbsp;'&nbsp;+&nbsp;j['description']<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elif&nbsp;key&nbsp;in&nbsp;j['title']:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;=&nbsp;True<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;'title:&nbsp;'&nbsp;+&nbsp;j['title']<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break<br>&nbsp;&nbsp;&nbsp;&nbsp;except:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue<br><br>&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;记得加not,&nbsp;代表只有Ture才能回到guidetrip表<br>&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;not&nbsp;save:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count&nbsp;+=&nbsp;1<br><br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;插入到垃圾回收collection<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target_cursor.insert(j)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;except:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;'already&nbsp;inserted'<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id&nbsp;=&nbsp;j['_id']<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;id<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;删除此document<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result&nbsp;=&nbsp;source_cursor.delete_one({'_id':id})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count_for_trash&nbsp;+=&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;result.deleted_count<br><br>print&nbsp;'垃圾堆还剩下'&nbsp;+&nbsp;str(count)&nbsp;+&nbsp;'个,&nbsp;从垃圾堆回收了'&nbsp;+&nbsp;str(count_for_trash)&nbsp;+&nbsp;'个'<br><br>end_time&nbsp;=&nbsp;time.time()<br>use_time&nbsp;=&nbsp;end_time&nbsp;-&nbsp;start_time<br>print&nbsp;'used&nbsp;time:&nbsp;'&nbsp;+&nbsp;str(use_time)";return code;}