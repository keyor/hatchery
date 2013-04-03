hatchery
========

与星际争霸里面的虫族模型结合

概述
    基地 ->幼虫->生成不同的虫子->虫子完成一系列的工作 

流程
    每生产一个虫子，人口+1，虫子完成工作，杀之，人口-1。
    人口为0 则判定整个流程结束。

对象说明
    资源对象
    爬虫对象
    资源对象对应多种多个虫子

配置 configs/Config
    delay 抓取延时
    topN 每个页面抓取的链接数量
    threands 线程数量
    depth 抓取循环次数

插件 configs/*
    具体大家自己进去看吧
    
log
    结束状态判断有问题
    速度过快时候，出现soket hang up
    通过hooks来自定义相关部分的才做，现在仅有urlfilter及parsehtml部分
