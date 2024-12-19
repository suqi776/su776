<script setup lang='ts'>

</script>

<template>
  <div class="mb-4">
    <Nav />
    <div v-if="$route.path === '/'" class="h-[calc(50vh-64px)] hidden xl:flex xl:flex-col xl:items-center xl:justify-center bg-[var(--c-bg)]">
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
