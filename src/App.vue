<script setup lang="ts">
// 在页面加载时，读取本地存储中的颜色并设置
onMounted(() => {
  initializeColors()
})

const isDark = useDark()

// 动态设置 theme-color
function setThemeColor(isDark: boolean) {
  const themeColor = isDark ? '#000000' : '#ffffff' // 深色和浅色主题颜色
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
}

// 初始设置
onMounted(() => {
  setThemeColor(isDark.value)
})

// 监听主题切换
watch(isDark, (newVal) => {
  setThemeColor(newVal)
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
