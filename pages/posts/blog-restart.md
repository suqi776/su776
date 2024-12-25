---
title: 博客又复活了
date: 2024-12-18
tags:
  - 随笔
category:
  - 博客
type: post
---

[[toc]]
Vite6.0 发布了，想着用来练一下手，将自己的博客重写了。

---

## 使用了哪些技术

### Vite
- [Vite](https://vitejs.dev/): 用作构建工具，提供了快速的开发体验和优化的生产构建。
- [vite-ssg](https://github.com/antfu-collective/vite-ssg): 用于生成静态站点生成（SSG）支持。
- [vite-pwa](https://vite-pwa-org.netlify.app/): 用于生成 PWA 应用。

### Vue 3
- [Vue](https://vuejs.org/): 使用 Vue 3 构建前端应用。
- [vue-router](https://router.vuejs.org/): 用于管理应用中的路由，支持单页面应用（SPA）导航。
- [vueuse](https://vueuse.org/): Vue 的组合式 API 函数库，提供了许多常用的工具函数。

### Unocss
- [unocss](https://unocss.dev/): 一个原子 CSS 框架，用于简化样式的开发。

### Markdown 解析与处理
- [markdown-it](https://github.com/markdown-it/markdown-it): 用于解析 Markdown 内容并渲染为 HTML。
- [shikijs](https://shiki.style)：用于渲染代码高亮。
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor): 为 Markdown 文档生成锚点。
- [markdown-it-table-of-contents](https://github.com/cmaas/markdown-it-table-of-contents): 自动生成目录。
- [markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts): 在 Markdown 中支持 GitHub 风格的提醒。
- [gray-matter](https://github.com/jonschlinkert/gray-matter): 处理带有 YAML 前置数据的 Markdown 文件。

### Pinyin 和拼音处理
- [pinyin-pro](https://pinyin-pro.cn/): 用于生成拼音。

### UI 和图标
- [iconify](https://iconify.design/): 用于提供图标数据。

### 开发工具与配置
- [ESLint](https://eslint.org/): 用于 JavaScript 和 Vue 代码的静态分析,确保代码质量。
- [typescript](https://www.typescriptlang.org/): 用于支持 TypeScript 开发。
- [autoprefixer](https://github.com/postcss/autoprefixer): 用于自动为 CSS 添加浏览器前缀。
- [eslint-config](https://github.com/antfu/eslint-config): 使用大佬Anthony Fu的配置, ESLint 规则。

### 其他工具
- [nprogress](https://github.com/rstacruz/nprogress): 页面加载进度条。
- [dayjs](https://day.js.org/): 轻量级的日期处理库，类似于 Moment.js。
- [twikoo](https://twikoo.js.org/): 用于评论系统的集成，支持与微信、QQ 等服务的连接。

### 自动化工具
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import): 自动导入常用的函数或组件。
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components): 自动导入 Vue 组件。
- [unplugin-vue-markdown](https://github.com/antfu/unplugin-vue-markdown): 允许在 Vue 组件中直接使用 Markdown 格式的内容。
- [unplugin-vue-router](https://github.com/antfu/unplugin-vue-router): 自动生成路由配置，简化 Vue Router 的使用。

## 目前的功能
- [首页](/)：展示最新文章列表。
- [图文页](/short)：展示短文列表。
- [分类页](/category)：展示分类下的文章列表。
- [标签页](/tag)：展示标签下的文章列表。
- [归档页](/archive)：展示文章的发布日期列表。
- [友链页](/link)：展示友情链接。
- [关于页](/about)：展示关于我。
- 文章详情页：
  - 评论系统
  - 文章目录
  - ⚠️ 上一篇、下一篇文章
  - ⚠️ 代码分组
