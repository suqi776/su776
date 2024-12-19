<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute() // 使用 useRoute 获取路由信息

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

const isMobileMenuOpen = ref(false) // 控制手机端菜单展开和收起

// 切换手机端菜单状态
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 手机端监听路由
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <nav :class="{ 'border-b': !isTop }" class="fixed top-0 z-999 h-64px w-full border-gray-200 p-x-2 dark:border-gray-700 aside xl:bg-[var(--c-bg)] xl:p-x-0">
    <div class="mx-auto max-w-1300px flex items-center justify-between">
      <!-- Logo or Brand -->
      <div>
        <RouterLink to="/">
          <SvgIcon class="h-64px w-64px" stroke-width="1px" />
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <ul class="hidden items-center xl:flex space-x-6">
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
      <button class="xl:hidden" @click="toggleMobileMenu">
        <div class="i-carbon-text-long-paragraph font-size-2xl" />
      </button>
    </div>

    <!-- Mobile Menu (Shows when isMobileMenuOpen is true) -->
    <div v-if="isMobileMenuOpen" class="absolute right-0 z-999 h-[calc(100vh-64px)] w-full flex justify-center p-4 xl:hidden aside">
      <ul class="w-full flex flex-col items-center">
        <li>
          <RouterLink to="/posts" class="block p-2">
            文章
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/category" class="block p-2">
            分类
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tags" class="block p-2">
            标签
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="block p-2">
            关于
          </RouterLink>
        </li>
        <li class="flex items-center justify-center">
          <button icon-btn card-hover-text @click="toggleDark()">
            <div i-carbon-sun dark:i-carbon-moon font-size-2xl />
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <div class="h-64px" />
</template>
