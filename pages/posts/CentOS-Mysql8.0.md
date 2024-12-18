---
title: Centos7 Yum安装MYSQL8.0详细安装步骤
date: 2024-02-22
tags:
  - mysql
  - centos
category:
  - linux
---

[[toc]]

### 更换yum源

### 打开 mirrors.aliyun.com，选择centos的系统，点击帮助

### 执行命令：
``` bash
yum install wget -y
``` 
### 改变某些文件的名称
``` bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
### 执行更换yum源的命令
``` bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```
### 更新本地缓存
``` bash
yum clean all
yum makecache
```

### 查看系统中是否自带安装mysql
``` bash
yum list installed | grep mysql
```
### 删除系统自带的mysql及其依赖（防止冲突）
``` bash
yum -y remove mysql-libs.x86_64
```
### 安装wget命令
``` bash
yum install wget -y
```
### 给CentOS添加rpm源，并且选择较新的源
``` bash
wget -i -c https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
```
### 安装下载好的rpm文件
``` bash
yum install mysql80-community-release-el7-3.noarch.rpm -y
```
### 使用yum安装mysql
``` bash
yum install mysql-community-server -y
```
#### 安装中遇到错误解决方式
``` log
错误：mysql-community-libs-8.0.32-1.el7.x86_64.rpm 的公钥尚未安装
失败的软件包是：mysql-community-libs-8.0.32-1.el7.x86_64
GPG 密钥配置为：file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```
解决办法：
执行如下命令后再次安装：
``` bash
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```
### 启动mysql服务
``` bash
#启动mysql服务，查看启动状态及是否开机启动
systemctl start mysqld.service
systemctl status mysqld.service
systemctl list-unit-files | grep enabled
```
### 获取mysql的临时密码
``` bash
grep "password" /var/log/mysqld.log
```
### 使用临时密码登录
``` bash
mysql -uroot -p
#输入密码
```
### 修改密码
``` bash
#密码要符合mysql安全规则，否则修改不成功
ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';
```
### 设置字符集为utf-8
``` bash
#在[mysqld]部分添加：
character-set-server=utf8
#在文件末尾新增[client]段，并在[client]段添加：
default-character-set=utf8
```
