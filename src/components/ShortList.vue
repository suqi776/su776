<script setup lang="ts">
import { useShortData } from '../composables/posts.data'

const short = useShortData()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 sm:grid-cols-2">
    <div
      v-for="(item, index) in short"
      :key="index"
      class="group rounded-lg aside-item hover:card-hover-text"
    >
      <RouterLink :to="item.path" class="block">
        <!-- 图片容器 -->
        <div class="relative overflow-hidden rounded-t-lg">
          <img
            :src="item.imgURL"
            :alt="item.title"
            class="my-transition h-40 w-full rounded-t-lg object-cover group-hover:scale-120"
          >
        </div>
        <!-- 标题部分 -->
        <div class="p-3">
          <div
            class="block truncate text-center text-lg font-semibold"
          >
            {{ item.title }}
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
