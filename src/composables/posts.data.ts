import type { Post } from '../types'
import dayjs from 'dayjs'
import Timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useRouter } from 'vue-router/auto'

dayjs.extend(utc)
dayjs.extend(Timezone)

// 通用数据获取函数
function useRoutesData(prefix: string): Post[] {
  const router = useRouter()

  // 获取指定前缀的路由
  const routes: Post[] = router.getRoutes()
    .filter(i => i.path.startsWith(prefix) && (i.meta.frontmatter as { title: string })?.title && !i.path.endsWith('.html'))
    .map((i) => {
      const frontmatter = i.meta.frontmatter as Post
      return {
        path: frontmatter.path || i.path,
        title: frontmatter.title || '未命名',
        date: dayjs.tz(frontmatter.date, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss') || 'No date',
        desc: frontmatter.desc || '',
        tags: frontmatter.tags || [],
        layout: frontmatter.layout || '',
        category: frontmatter.category || [],
        type: frontmatter.type || 'post',
        imgURL: frontmatter.imgURL || '',
      }
    })

  // 按日期排序
  routes.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
  return routes
}

// 获取帖子数据
export function usePostsData(): Post[] {
  return useRoutesData('/posts')
}

// 获取短内容数据
export function useShortData(): Post[] {
  return useRoutesData('/short')
}
