<script setup lang='ts'>

</script>

<template>
  <div class="mb-4">
    <Nav />
    <div v-if="$route.path === '/'" class="h-[calc(50vh-64px)] flex flex-col items-center justify-center bg-[var(--c-bg)]">
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
