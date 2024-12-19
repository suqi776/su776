---
title: Vite + Vue 3 项目中添加 PWA
tags:
  - Vue3
  - Vite
  - PWA
category:
  - Vue
date: 2024-12-19 14:00:00
---
[[toc]]
在 Vite + Vue 3 项目中添加 PWA，使用 Vite PWA 插件。配置步骤如下：

---
## 安装依赖

```bash
pnpm i vite-plugin-pwa -D
```

## 配置 Vite
```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // 自动更新
      devOptions: {
        enabled: true, // 启用开发模式的 PWA
      },
      manifest: {
        name: '你的应用名称',
        short_name: '应用简称',
        description: '应用描述',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 图标
在 `public` 目录下创建 `icons` 目录，并添加 `icon-192x192.png` 和 `icon-512x512.png` 图标。

## 运行
```bash
pnpm run dev
```

::: details 可以看见浏览器地址栏左上角出现了 PWA 图标，点击图标可以安装 PWA 应用。
![vite-vue3-pwa](/posts/pwa.png)
:::

## 图标生成插件
可以使用 `pwa-asset-generator` 插件自动生成图标。

```bash
npx pwa-asset-generator ./public/iocn.svg  ./public/icons 
```

::: details 生成如下图标
![pwa-asset-generator](/posts/pwa-asset-generator.png)
:::

## 参考
::: tip client.d.ts
你可以在[client.d.ts](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/src/types.ts) 文件中找到 vite-plugin-pwa 插件的所有配置选项。
:::