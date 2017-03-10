#encoding:utf-8
'''

Purpose: This is a script for translate python code to a javascript function which return this python code in web browser.

Author: Gupern

Create Date: 2017-03-10

Last Modify Date: 2017-03-10

Algorithm: 
    1. 打开文件 √
    2. 逐行读取 √
    3. 替换tab为四个空格 √
    4. 添加开头、结尾、每句话的打包
    5. 生成文件
    6. 遍历文件夹
    7. 自动文件名

'''

f = open('./operation/process_replace_words.py','r')
o = open('./operation/process_replace_words.js','w')

# js方程函数头
o.write('function process_replace_words() {')

# 声明最终字符串s
s=''

# 对文件中的每一行进行加工
for i in f.readlines():
    # 将\n替换为<br>
    if '\n' in i:
        i=i.replace('\n','<br>')

    # 如果有tab制表符，则将之替换为四个空格
    if '\t' in i:
        i=i.replace('\t','    ')

    # 拼装
    s+=i
print s    
code = 'var code=\"' + s + '\";'
code = code + 'return code'

o.write(code)


# js方程函数尾
o.write('}')

# 关闭文件
f.close()
o.close()
