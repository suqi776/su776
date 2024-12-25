---
layout: category
---

<!-- @layout-full-width -->
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsData } from '../../src/composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()

// 获取路由对象
const route = useRoute() as { params: { category?: string } }

const type = ref<string>('')

// 根据路由中的 tag 参数来设置选中的标签
watchEffect(() => {
  const tagFromRoute = route.params.category
  type.value = typeof tagFromRoute === 'string' ? tagFromRoute : ''
})

// 根据选中的标签过滤文章
const filteredPosts = computed(() => {
  if (!type.value)
    return posts
  return posts.filter(post => post.category?.includes(type.value))
})
</script>

<PostsType :posts="filteredPosts" title="分类" :type="type" />
