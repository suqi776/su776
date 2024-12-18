---
title: VitePress for Tailwind CSS
date: 2024-07-11
category:
  - Tailwind CSS
imgURL: '/img_2.jpg'
---

[[toc]]

在 `VitePress` 中使用 `Tailwind CSS` 时需使用 `PostCSS` 配置

## 使用方法
安装 Tailwind CSS
::: code-group
``` bash [pnpm]
pnpm install -D tailwindcss
```
``` bash [npm]
npm install -D tailwindcss
```
``` bash [yarn]
yarn add -D tailwindcss
```
::: tip 注意
`VitePress` 底层集成了 `PostCSS` 无需显现性引入
:::

添加配置
::: code-group
``` js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = { // [!code ++]
  content: ['./.vitepress/theme/**/*.vue'], // [!code ++]
  // 需要tailwind css覆盖到位置
  theme: { // [!code ++]
    extend: {}, // [!code ++]
  }, // [!code ++]
  plugins: [], // [!code ++]
} // [!code ++]
```
``` js [postcss.config.js]
/** postcss.config.js */
import tailwind from 'tailwindcss' // [!code ++]
// [!code ++]
export default { // [!code ++]
  plugins: [ // [!code ++]
    tailwind(), // [!code ++]
  ], // [!code ++]
} // [!code ++]
```
``` css [style.css]
/** style.css */
@tailwind base; // [!code ++]
@tailwind components; // [!code ++]
@tailwind utilities; // [!code ++]
```
:::
输入：
``` html
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```
输出：
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

## 杂项
#### Tailwind CSS 插件
[跳转Tailwind CSS or VS Code](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

#### VS Code设置
设置默认 css 格式为 tailwind css，在 .vscode/settings.json 中添加
``` json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```
