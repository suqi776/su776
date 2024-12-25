<script setup lang="ts">
import link from '../data/link.json'
</script>

<template>
  <div>
    <h2 class="mb-4">
      <span class="text-3xl font-bold">友情链接</span>
      <h2 class="text-sm text-gray-400">
        随机排列
      </h2>
    </h2>
    <ul class="grid grid-cols-1 mb-4 gap-4 md:grid-cols-4">
      <li
        v-for="(item, index) in link"
        :key="index"
        class="group flex items-center rounded-lg p-4 transition aside-item"
      >
        <a :href="item.link" target="_blank" class="w-full flex items-center space-x-4">
          <img
            :src="item.avatar"
            alt=""
            class="my-transition h-12 w-12 rounded-full object-cover group-hover:rotate-360 group-hover:scale-115"
          >
          <div class="truncate">
            <p class="truncate text-lg font-bold">{{ item.name }}</p>
            <p class="truncate text-sm text-gray-400">{{ item.description }}</p>
          </div>
        </a>
      </li>
    </ul>
    <h2 class="mb-4 text-3xl font-bold">
      我的友链
    </h2>
  </div>
</template>
