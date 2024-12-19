import path from 'node:path'
import MarkdownItShiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
// node.js built-in module
import fs from 'fs-extra'
// 用于处理markdown文件的frontmatter信息
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import GitHubAlerts from 'markdown-it-github-alerts'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { slugify } from './scripts/slugify'

import { lineNumberPlugin } from './src/composables/markdown/lineNumbers'
import { preWrapperPlugin } from './src/composables/markdown/preWrapper'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate', // 自动更新
      workbox: {
        maximumFileSizeToCacheInBytes: 17 * 1024 * 1024, // 增加到 15 MB
      },
      devOptions: {
        enabled: true, // 启用开发模式的 PWA
      },
      manifest: {
        name: 'SuBlog',
        short_name: 'Sublog',
        description: 'Su77\'s Blog',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'public/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'public/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'public/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports, // auto import routes
        unheadVueComposablesImports, // 页面title自动设置
      ],
      dts: 'auto-imports.d.ts',
      dirs: [
        'src/components',
        'src/composables',
      ],
      vueTemplate: true,
    }),
    VueRouter({
      // globally set the extensions
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      // logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (!path)
          return

        // 处理 markdown 文件，将 frontmatter 信息添加到 route meta 中
        if (path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.addToMeta({
            frontmatter: data,
          })
        }
      },
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    // Markdown配置类
    Markdown({
      // 包裹组件
      wrapperComponent: 'Posts',
      // 根据传入的id和code决定包裹类
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      // 异步设置markdown解析器
      async markdownItSetup(md) {
        // 使用Shiki主题对markdown进行处理
        md.use(await MarkdownItShiki({
          // 主题配置
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          // 默认颜色设置
          defaultColor: false,
          // CSS变量前缀
          cssVariablePrefix: '--s-',
          // 转换器配置
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          // containerHeaderHtml: '',
        })
        md.use(GitHubAlerts)
        // 自定义插件
        // 添加复制代码按钮与语言提示
        md.use(preWrapperPlugin, { codeCopyButtonTitle: '复制代码' })
        // 添加行号
        md.use(lineNumberPlugin, { enable: true })
      },
    }),
    // should be placed after `Markdown()`
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
    UnoCSS(),
  ],
})
