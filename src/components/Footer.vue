<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 计算从 2022-10-20 到当前时间的天、小时、分钟和秒数
const startDate = new Date('2020-10-20 00:00:00')

const stats = ref({
  runningTime: '',
})

// 更新运行时间函数
function updateRunningTime() {
  const currentDate = new Date()
  let diffInSeconds = Math.floor((currentDate.getTime() - startDate.getTime()) / 1000)

  const days = Math.floor(diffInSeconds / (3600 * 24))
  diffInSeconds -= days * 3600 * 24

  const hours = Math.floor(diffInSeconds / 3600)
  diffInSeconds -= hours * 3600

  const minutes = Math.floor(diffInSeconds / 60)
  const seconds = diffInSeconds - minutes * 60

  stats.value.runningTime = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
}

// 在组件挂载时每秒更新运行时间
onMounted(() => {
  updateRunningTime() // 初始化时一次性更新
  setInterval(updateRunningTime, 1000) // 每秒更新一次
})
</script>

<template>
  <footer class="w-full py-8">
    <div class="mx-auto px-6 text-center container">
      <p class="text-sm">
        <a class="card-hover-text" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> &copy; {{ new Date().getFullYear() }} Su77's Blog
      </p>
      <nav class="flex justify-center gap-4">
        <!-- <a
          href="https://github.com/sqsuqi/myvite"
          target="_blank"
          rel="noreferrer"
          class="hover:text-gray-400"
        >
          GitHub
        </a>
        <a
          href="/about"
          class="hover:text-gray-400"
        >
          About
        </a>
        <a
          href="/contact"
          class="hover:text-gray-400"
        >
          Contact
        </a> -->
      </nav>
      <span class="text-xs text-gray-400">本站已持续运行{{ stats.runningTime }}</span>
    </div>
  </footer>
</template>
