---
outline: deep
title: Centos7 Yum MYSQL8.0添加远程权限
date: 2024-02-21
---

[[toc]]

### 1、创建新用户
```
create user 'admin'@'%' identified by 'password';
```
### 2、执行授权
```
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
```

### 3、刷新
```cmd
flush privileges;
```

### 4、授权远程
```
ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```

### 5、刷新
```cmd
flush privileges;
```

### 注意
**<p color=red>mysql8版本执行 grant all privileges on *.*  to  'root'@'%'  identified by 'root'  with grant option;  会报语法错误  ERROR 1064 (42000)</p>**
