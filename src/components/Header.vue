<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute() // 使用 useRoute 获取路由信息
</script>

<template>
  <div class="mb-4">
    <Nav />
    <div v-if="route.path === '/'" class="hidden h-[calc(50vh-64px)] bg-[var(--c-bg)] xl:flex xl:flex-col xl:items-center xl:justify-center">
      <div class="text-5xl font-bold">
        Welcome to my blog
      </div>
      <div class="mt-4 text-lg">
        <HomeText />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
