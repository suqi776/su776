---
title: Iconify for Tailwind CSS
date: 2024-07-11
category:
  - Iconify
  - Tailwind CSS
imgURL: '/img_1.jpg'
---

[[toc]]

Iconify 是一套面向开发人员和设计人员的工具，旨在以一致的方式轻松使用不同的图标集。<br/>
优点：
- 图标数量庞大：`Iconify` 支持超过 100 个图标集，包含数万个图标。
- 灵活性高：支持多种格式，包括 SVG 和字体图标。
- 跨框架支持：可在  `Vue`、`React`、`Svelte`、`Angular` 等框架中使用。

## 准备开始
> [!WARNING] 先决条件
> 项目中使用了Tailwind CSS 若没有点击[这里](https://tailwindcss.com/)开始


> [!TIP] 在vitepress中使用
> [点我跳转：Vitepress for Tailwind CSS](./vitepress-for-tailwind-css)


## 安装
运行以下命令以将图标添加到项目：
::: code-group
``` bash [pnpm]
pnpm i -D @iconify/tailwind
```
``` bash [npm]
npm i -D @iconify/tailwind
```
``` bash [yarn]
yarn add -D @iconify/tailwind
```
:::
## addIconSelectors 插件
与 [addDynamicIconSelectors](./useIconify#adddynamiciconselectors-插件) 区别
  - 更紧凑的CSS，重用通用代码
  - 更简洁的图标名称

缺点
  - 需要引入

::: details 配置tailwind.config.js
``` js
/** 引入addIconSelectors */
import { addIconSelectors } from '@iconify/tailwind' // [!code ++]

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    addIconSelectors([ // [!code ++]
      // Iconify 插件，需要编写图标集列表才能加载 // [!code ++]
      'mdi', // [!code ++]
      'mdi-light', // [!code ++]
      'carbon', // [!code ++]
      'simple-icons', // [!code ++]
      'logos' // [!code ++]
    ]) // [!code ++]
  ],
}
```
:::

使用addIconSelectors 插件时，还需要将图标集安装为开发依赖项。您可以安装完整的软件包 `@iconify/json` 或图标集的软件包，要使用 `@iconify-json/{prefix}`。

::: details 如果要使用`mdi-light--home`，请安装 `@iconify-json/mdi-light` 包。
```
pnpm i -D @iconify-json/mdi-light
```
例如：
``` html
<span class="iconify mdi-light--home"></span>
```
输出：<br/>
<span class="iconify mdi-light--home" style="width:32px;height:32px"></span>
:::

::: tip 去哪里获取这些图标
[iconify.design](https://icon-sets.iconify.design/) 超过 200,000 个开源图标库
:::

### 使用方法
要将图标添加到 HTML，首先创建一个具有两个类名的 `<span>` 元素：
- 将图标呈现为背景或蒙版图像的类名。
- 带有图标名称的类名（CSS 包含图标数据）。
<br/>

例子：

``` html
<span class="iconify mdi--alarm"></span>
<span class="iconify mdi-light--home"></span>
<span class="iconify carbon--edit-off"></span>
<span class="iconify-color logos--vitejs"></span>
<span class="iconify-color logos--typescript-icon-round"></span>
<span class="iconify simple-icons--vuedotjs"></span>
```

输出：
<br/>
<span class="iconify mdi--alarm" style="width:16px;height:16px"></span>
<span class="iconify mdi-light--home"></span>
<span class="iconify carbon--edit-off"></span>
<span class="iconify-color logos--vitejs"></span>
<span class="iconify-color logos--typescript-icon-round"></span>
<span class="iconify simple-icons--vuedotjs"></span>

## addDynamicIconSelectors 插件
与 [addIconSelectors](./useIconify#addiconselectors-插件) 区别
  - 无需配置插件
  - 每个图标一个类名

缺点
  - 类名奇奇怪怪
::: details 配置tailwind.config.js
``` js
/** 引入addDynamicIconSelectors */
import { addDynamicIconSelectors } from '@iconify/tailwind' // [!code ++]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.html'],
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(), // [!code ++]
  ],
}
```
:::

### 使用方法
类名的语法是这样的：`[str]icon-[{prefix}--{name}]`，其中`{prefix}`是图标集前缀，`{name}`是图标名称。<br/>

例子：
``` html
<span class="icon-[ph--alarm-duotone]"></span>
<span class="icon-[fluent-emoji-flat--alarm-clock]"></span>
<span class="icon-[carbon--edit-off]"></span>
```

<span class="icon-[ph--alarm-duotone]"></span>
<span class="icon-[fluent-emoji-flat--alarm-clock]"></span>
<span class="icon-[carbon--edit-off]"></span>
