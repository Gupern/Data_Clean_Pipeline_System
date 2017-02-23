# Data_Clean_Pipeline_System
This is the system for filter the data from crawler and put them into NoSQL

这是毕业设计未完成的股票预测系统的子项目，用于将爬虫爬下来的杂乱数据，进行规则化导入MongoDB（后期将可以选择导入到何种DB上）。

功能描述：

- 对接scrapy爬虫

- 自定义清洗规则，document格式

- 可对字段进行过滤（不满足条件的删除、只有满足条件的留下等规则）

- 可对字段进行替换（如将姓名替换成xxx）

- 可选择源数据库地址，目标数据库地址，以及具体哪个collection

- pipeline可视化流程

- 其他待加功能
