<script setup lang="ts">
const isTop = ref(true) // 用于判断当前是否在顶部

function handleScroll() {
  // 判断页面是否滚动到顶部
  isTop.value = window.scrollY === 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isShow = ref(false)

function toggleShow() {
  isShow.value = !isShow.value
}

function handleClickOutside(event: MouseEvent) {
  // 如果点击区域不在 UseTheme 或触发按钮内，关闭组件
  const useThemeElement = document.querySelector('.use-theme')
  const paintBrushElement = document.querySelector('.i-carbon-paint-brush')

  if (useThemeElement && !useThemeElement.contains(event.target as Node)
    && paintBrushElement && !paintBrushElement.contains(event.target as Node)) {
    isShow.value = false
  }
}

// 添加事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 在组件销毁时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav :class="{ 'border-b': !isTop }" class="fixed top-0 z-999 h-64px w-full border-gray-200 bg-[var(--c-bg)] dark:border-gray-700">
    <div class="mx-auto max-w-1300px flex items-center justify-between">
      <!-- Logo or Brand -->
      <div>
        <RouterLink to="/">
          <SvgIcon class="h-64px w-64px" stroke-width="1px" />
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <ul class="flex items-center space-x-6">
        <li>
          <RouterLink to="/posts" class="transition duration-300 card-hover-text">
            文章
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/category" class="transition duration-300 card-hover-text">
            分类
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tags" class="transition duration-300 card-hover-text">
            标签
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="transition duration-300 card-hover-text">
            关于
          </RouterLink>
        </li>
        <li class="flex items-center">
          <button icon-btn card-hover-text @click="toggleDark()">
            <div i-carbon-sun dark:i-carbon-moon font-size-2xl />
          </button>
        </li>
        <li class="flex items-center">
          <div class="i-carbon-paint-brush cursor-pointer font-size-2xl card-hover-text" @click="toggleShow()" />
          <UseTheme v-if="isShow" class="use-theme pos-absolute right-10 top-64px" />
        </li>
      </ul>

      <!-- Mobile Menu Button (Hamburger) -->
      <button class="xl:hidden">
        <div class="i-carbon-text-long-paragraph font-size-2xl" /> <!-- You can use an icon here -->
      </button>
    </div>
  </nav>
  <div class="h-64px" />
</template>

<style scoped>
  /* You can customize any additional styles here */
</style>
