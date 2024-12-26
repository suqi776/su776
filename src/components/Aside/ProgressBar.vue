<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

// 接收属性
const { label, percent } = defineProps({
  label: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
})

// 动态文本内容（百分比或具体时间）
const displayText = computed(() => {
  switch (label) {
    case '今日': {
      const hoursRemaining = Math.floor((100 - percent) / 100 * 24)
      return `还剩 ${hoursRemaining} 小时`
    }
    case '本周': {
      const daysRemaining = Math.round((100 - percent) / 100 * 7)
      return `还剩 ${daysRemaining} 天`
    }
    case '本月': {
      const daysRemaining = Math.round((100 - percent) / 100 * new Date().getDate())
      return `还剩 ${daysRemaining + 1} 天`
    }
    case '本年': {
      const daysRemaining = Math.round((100 - percent) / 100 * (new Date().getFullYear() % 4 === 0 ? 366 : 365))
      return `还剩 ${daysRemaining} 天`
    }
    default:
      return ''
  }
})
</script>

<template>
  <div
    class="flex items-center"
  >
    <!-- 标签 -->
    <div class="w-16 text-sm">
      {{ label }}
    </div>
    <!-- 进度条 -->
    <div
      class="relative h-4 w-full overflow-hidden rounded-full aside-item"
    >
      <!-- 进度条背景 -->
      <div
        class="absolute left-0 top-0 h-4 flex items-center bg-[var(--my-p-bg)]"
        :style="{ width: `${percent}%` }"
      >
        <!-- 显示动态文本 -->
        <span class="ml-2 whitespace-nowrap text-xs">
          {{ percent }}% - {{ displayText }}
        </span>
      </div>
    </div>
  </div>
</template>
