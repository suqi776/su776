import type { Post } from '../types'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router/auto'

export default function usePostsData() {
  // 路由和当前页面
  const router = useRouter()

  // 获取所有帖子路由
  const routes: Post[] = router.getRoutes()
    .filter(i => i.path.startsWith('/posts') && (i.meta.frontmatter as { title: 'string' })?.title && !i.path.endsWith('.html'))
    .map((i) => {
      const frontmatter = i.meta.frontmatter as Post
      return {
        path: frontmatter.path || i.path,
        title: frontmatter.title || '未命名',
        date: dayjs(frontmatter.date).format('YYYY-MM-DD HH:mm:ss') || 'No date',
        desc: frontmatter.desc || '',
        tags: frontmatter.tags || [],
        layout: frontmatter.layout || '',
        category: frontmatter.category || [],
      }
    })

  // 按日期排序
  routes.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
  return routes
}
