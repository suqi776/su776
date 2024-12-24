<script setup lang="ts">
import { usePostsData } from '../../composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()
</script>

<template>
  <div class="mb-2 rounded-lg p-6 aside">
    <h2 class="mb-2 text-2xl font-bold">
      最近文章
    </h2>
    <ul class="list-none">
      <li
        v-for="(post, index) in posts.slice(0, 5)"
        :key="index"
        class="mb-2"
      >
        <RouterLink :to="post.path" class="group my-transition block text-#555">
          <h3 class="text-base font-semibold group-hover:card-hover-text">
            {{ post.title }}
          </h3>
          <p class="text-sm">
            {{ post.date }}
          </p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
