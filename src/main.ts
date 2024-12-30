// @ts-expect-error missing types
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import './styles/my.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import '@shikijs/twoslash/style-rich.css'

// 代码复制
import './composables/codeCopy'
// 代码分组
import './composables/codeGroup'

export const createApp = ViteSSG(
  App,
  {
    // 路由配置
    routes,
    // 配置滚动行为
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
      // 返回前进/后退时的记录位置
        return savedPosition
      }
      else {
      // 切换到新路由时滚动到顶部
        return { top: 0 }
      }
    },
  },
  ({ router, isClient }) => {
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
