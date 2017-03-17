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

### 细化步骤

采用敏捷开发方法，先怼出核心功能：

- [x] 写出界面 已完成初始按钮和文本框，等后面完成功能了再优化
- [x] 点击按钮执行python代码的功能 （替换为点击按钮生成python代码的功能）
- [x] 下拉列表---select
- [x] 嵌入ssh链接终端，采用wssh
- [x] 添加代码框
- [ ] 返回数据库、collections和字段名
        pymongo 获取所有的fields(由于wssh是flask程序，在flask中增加获字段的api)
        写api(返回fields即可，后面扩展为返回dbname，colname)
        使用ajax请求，并返回到select中
- [x] 选择本地operation文件
- [ ] 拖进字典上传到文件夹（自动重命名）

ajax:修改wssh的方法，添加返回链接结果的api</li>
写添加map的前端</li>
按+号后添加一行</li>
添加键值映射功能</li>
修改operation的py代码</li>
添加操作</li>
逻辑缩进</li>
返回服务器中的数据库和collections</li>
整合DataX</li>
实现下拉菜单返回操作选项，返回数据库列表</li>
processed - date - source_url 去重，增量导入</li>
定时crontab, 且判断上次操作是否完成</li>


后面慢慢优化，添加定时功能等等
整合DataX

定时执行代码`crontab xxx`； 分 时 天 月 星期几 执行命令；scp 安全性问题

判断上次操作是否完成，若未完成，则放入等待队列，等完成后再唤醒；
添加提高优先级功能，将现在进程阻塞，先完成紧急的数据导入；
调度算法实现。

> 2017-03-13 使用了wssh的代码，更改协议为MIT协议

## [wssh 项目地址](https://github.com/aluzzardi/wssh/)

#### 安装命令 Install Command
**install dependence package**

`pip install gevent gevent-websocket paramiko flask`

**install wssh**

`git clone https://github.com/aluzzardi/wssh.git`
`cd wssh`
`python setup.py install`
#### start wssh service

`wsshd`
#### open browser and enter address

default `0.0.0.0:5000`


## Note

#### how to display change line character in textarea?
use \r\n

#### how to add a space entity in html?

空格在html的表示代码为：`&nbsp;`

#### how to modify the wssh?

**before install**

modify the `wssh/templates/index.html`

**after install**

modify `/usr/local/lib/python2.7/site-packages/wssh-0.1.0-py2.7.egg/wssh/templates/index.html`(or other python address)

