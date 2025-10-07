---
title: 软件设置代理
date: 2025-10-07 12:00:00
tags:
  - pnpm
  - clash
category:
  - clash
type: post
---

# 删除 HTTP 代理
```bash
pnpm config delete proxy
pnpm config delete https-proxy
```

# 添加 HTTP 代理
```bash
pnpm config set proxy http://127.0.0.1:7890
pnpm config set https-proxy http://127.0.0.1:7890
```
