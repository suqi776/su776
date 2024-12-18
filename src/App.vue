<script setup lang="ts">
// 在页面加载时，读取本地存储中的颜色并设置
onMounted(() => {
  initializeColors()
})
</script>

<template>
  <div>
    <Header />
    <router-view />
    <div flex="~ col items-center" m-auto w-full>
      <Footer />
    </div>
  </div>
</template>
