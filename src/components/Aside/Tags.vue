<script setup lang="ts">
import { usePostsData } from '../../composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()

// 获取所有type类型的数据并去重
const items: string[] = [
  ...new Set(
    posts
      .flatMap(post => post.tags ?? []) // 使用 props.type 动态访问字段
      .filter(category => category !== ''), // 过滤空值
  ),
]
</script>

<template>
  <div class="mb-2 rounded-lg p-6 aside">
    <h2 class="mb-2 text-2xl font-bold">
      标签
    </h2>
    <div class="flex flex-wrap">
      <RouterLink
        v-for="item in items"
        :key="item"
        :to="`/tags/${item}`"
        class="p-0.4em text-#555 font-bold transition-transform duration-200 ease-in-out hover:scale-110 card-hover-text!"
      >
        {{ item }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>
