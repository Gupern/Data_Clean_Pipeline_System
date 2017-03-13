空格的html表示&nbsp;

### 细化步骤
采用敏捷开发方法，先怼出核心功能：

- [x] 写出界面 已完成初始按钮和文本框，等后面完成功能了再优化
- [x] 点击按钮执行python代码的功能 （替换为点击按钮生成python代码的功能）
- [x] 下拉列表---select
- [x] 嵌入ssh链接终端，采用wssh



- [ ] 返回页面输出结果（太难实现，等生成代码实现再说）
- [ ] 填写命令并传入执行
- [ ] 返回数据库、collections和字段名
- [ ] 返回文件夹下的字典名
- [ ] 拖进字典上传到文件夹（自动重命名）
- [ ] 执行导入到目标数据库的代码

后面慢慢优化，添加定时功能等等

定时执行代码crontab xxx； 分 时 天 月 星期几 执行命令；scp 安全性问题

判断上次操作是否完成，若未完成，则放入等待队列，等完成后再唤醒；
添加提高优先级功能，将现在进程阻塞，先完成紧急的数据导入；
调度算法实现。

> 2017-03-13 使用了wssh的代码，更改协议为MIT协议
## wssh 项目地址
https://github.com/aluzzardi/wssh/

#### 安装命令command:
install dependence package
'pip install gevent gevent-websocket paramiko flask'

install wssh
'git clone https://github.com/aluzzardi/wssh.git'
'cd wssh'
'python setup.py install'

#### start wssh service
wsshd

open browser and enter 0.0.0.0:5000

# Question
---
## how to modify the wssh?
#### before install 
modify the wssh/templates/index.html
#### after install
modify /usr/local/lib/python2.7/site-packages/wssh-0.1.0-py2.7.egg/wssh/templates/index.html
(or other python address)


## Data_Clean_Pipeline_System 简介
This is the system for filter the data from crawler and put them into NoSQL

这是毕业设计未完成的股票预测系统的子项目，用于将爬虫爬下来的杂乱数据，进行规则化导入MongoDB（后期将可以选择导入到何种DB上）。

功能描述：

- 对接scrapy爬虫 （暂时不用，scrapy有item pipeline定义格式，现在趁着工作先完成从原始数据库 -> 中间数据库 -> 目的数据库这个过程中的清洗。

- 自定义清洗规则，document格式（暂时不用）

- 可对字段进行过滤（不满足条件的删除、只有满足条件的留下等规则）

- 可对字段进行替换（如将姓名替换成xxx）

- 可选择源数据库地址，目标数据库地址，以及具体哪个collection

- pipeline可视化流程


=======
