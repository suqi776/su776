---
layout: tag
---

<!-- @layout-full-width -->
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsData } from '../../src/composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()

// 获取路由对象
const route = useRoute() as { params: { tag?: string } }

const selectedTag = ref<string>('')

// 根据路由中的 tag 参数来设置选中的标签
watchEffect(() => {
  const tagFromRoute = route.params.tag
  selectedTag.value = typeof tagFromRoute === 'string' ? tagFromRoute : ''
})

// 根据选中的标签过滤文章
const filteredPosts = computed(() => {
  if (!selectedTag.value)
    return posts
  return posts.filter(post => post.tags?.includes(selectedTag.value))
})
</script>

<PostsType :posts="filteredPosts" title="标签" :type="selectedTag" />
