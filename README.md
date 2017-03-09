# Data_Clean_Pipeline_System
This is the system for filter the data from crawler and put them into NoSQL

<<<<<<< Updated upstream
这是毕业设计未完成的股票预测系统的子项目，用于将爬虫爬下来的杂乱数据，进行规则化导入MongoDB（后期将可以选择导入到何种DB上）。

功能描述：

- 对接scrapy爬虫

- 自定义清洗规则，document格式

- 可对字段进行过滤（不满足条件的删除、只有满足条件的留下等规则）

- 可对字段进行替换（如将姓名替换成xxx）

- 可选择源数据库地址，目标数据库地址，以及具体哪个collection

- pipeline可视化流程

- 其他待加功能
=======

# Pipeline System for Automatically Operation and Maintenance
采用敏捷开发方法，先怼出核心功能：
    1. 写出界面
    2. 点击按钮执行python代码的功能
    3. 返回页面输出结果
    4. 下拉列表
    5. 填写命令并传入执行
    6. 返回数据库、collections和字段名
    7. 返回文件夹下的字典名
    8. 拖进字典上传到文件夹（自动重命名）
    9. 执行导入到目标数据库的代码
    other
后面慢慢优化，添加定时功能等等

定时执行代码crontab xxx； 分 时 天 月 星期几 执行命令；scp 安全性问题

判断上次操作是否完成，若未完成，则放入等待队列，等完成后再唤醒；
添加提高优先级功能，将现在进程阻塞，先完成紧急的数据导入；
调度算法实现。
>>>>>>> Stashed changes
