function process_replace_words() {var code="#encoding:&nbsp;utf-8<br><br>'''<br>&nbsp;&nbsp;&nbsp;author:&nbsp;Gupern<br>&nbsp;&nbsp;&nbsp;create_date:&nbsp;2017-2-21<br>&nbsp;&nbsp;&nbsp;last_modified:&nbsp;2017-2-21<br>&nbsp;&nbsp;&nbsp;this&nbsp;is&nbsp;the&nbsp;update_tour_guide_words_api<br><br>&nbsp;&nbsp;&nbsp;有待优化:&nbsp;1.&nbsp;写出一个界面<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;加上密码保护防止黑客盗用<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.&nbsp;增加从文件import功能,&nbsp;方便添加字典<br><br>&nbsp;&nbsp;&nbsp;:return:&nbsp;string<br>'''<br><br>import&nbsp;json<br>from&nbsp;pymongo&nbsp;import&nbsp;UpdateOne<br>from&nbsp;pymongo.errors&nbsp;import&nbsp;InvalidOperation<br>from&nbsp;util&nbsp;import&nbsp;mongo_util<br>import&nbsp;flask<br>from&nbsp;flask&nbsp;import&nbsp;Flask,request<br>app&nbsp;=&nbsp;Flask(__name__)<br><br><br><br>#&nbsp;connect&nbsp;database<br>db&nbsp;=&nbsp;mongo_util.get_mongo_client('mongodb://0.0.0.0:27017','test')<br>garbage_col&nbsp;=&nbsp;'tour_guides_words'<br>garbage_cursor&nbsp;=&nbsp;db[garbage_col]<br><br>#&nbsp;insert&nbsp;key&nbsp;of&nbsp;tour&nbsp;guides&nbsp;words<br><br>@app.route('/add_tour_guides_words',methods=['POST','GET'])<br><br>def&nbsp;add_tour_key():<br><br>&nbsp;&nbsp;&nbsp;&nbsp;tour_guides_word&nbsp;=&nbsp;request.args.get(u'tour_guides_word',u'导游')<br><br>&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;查看是否已有此单词<br>&nbsp;&nbsp;&nbsp;&nbsp;flag&nbsp;=&nbsp;garbage_cursor.find({'tour_guides_word':tour_guides_word})<br>&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;flag.count():<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;若已存在,&nbsp;则返回已经存在<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;'已存在此单词'<br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;若没有,&nbsp;则插入新单词<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result&nbsp;=&nbsp;garbage_cursor.insert_one(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'tour_guides_word':&nbsp;tour_guides_word<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;'添加成功'<br><br><br>if&nbsp;__name__&nbsp;==&nbsp;'__main__':<br>&nbsp;&nbsp;&nbsp;&nbsp;app.run(host='0.0.0.0',port=3002)<br>";return code;}