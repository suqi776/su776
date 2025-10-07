<script setup lang="ts">
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import { computed, ref } from 'vue'

const { isTitle } = defineProps({
  isTitle: {
    default: true,
    type: Boolean,
  },
})

// 加载插件
dayjs.extend(dayOfYear)
dayjs.extend(isLeapYear)

// 目标日期（春节）
const targetDate = '2026-02-17'
const today = dayjs()

// 计算剩余天数
const daysRemaining = computed(() => {
  try {
    return dayjs(targetDate).diff(today, 'day')
  }
  catch (error) {
    console.error('计算剩余天数时出现错误：', error)
    return 0
  }
})

// 进度计算函数
function getProgress(current: number, total: number): number {
  if (total <= 0)
    return 0
  return Number(((current / total) * 100).toFixed(2))
}

// 今日的进度
const currentTimeInMinutes = today.hour() * 60 + today.minute()
const totalMinutesInDay = 24 * 60
const todayProgress = getProgress(currentTimeInMinutes, totalMinutesInDay)

// 本周的进度
const weekProgress = getProgress(today.day(), 7)

// 本月的进度
const monthProgress = getProgress(today.date(), dayjs().daysInMonth())

// 本年的进度
const yearProgress = getProgress(today.dayOfYear(), dayjs().isLeapYear() ? 366 : 365)

// 控制翻转效果
const isFlipped = ref(false)

function flip() {
  isFlipped.value = true
}

function unflip() {
  isFlipped.value = false
}
</script>

<template>
  <div class="mb-2 h-200px perspective-1000 rounded-lg p-6 aside">
    <h2 v-if="isTitle" class="mb-2 text-2xl font-bold">
      倒计时
    </h2>
    <!-- 容器，使用 perspective 以启用 3D 效果 -->
    <div class="flip-container" @mouseenter="flip" @mouseleave="unflip">
      <div class="flip-card">
        <!-- 正面：进度条 -->
        <div class="flip-card-front">
          <div class="space-y-2">
            <ProgressBar label="今日" :percent="todayProgress" />
            <ProgressBar label="本周" :percent="weekProgress" />
            <ProgressBar label="本月" :percent="monthProgress" />
            <ProgressBar label="本年" :percent="yearProgress" />
          </div>
        </div>
        <!-- 反面：目标日期 -->
        <div class="flip-card-back">
          <div class="text-center">
            <div class="text-sm">
              距离
            </div>
            <div class="text-2xl font-bold">
              春节
            </div>
            <div class="text-4xl text-[var(--my-p-bg)] font-bold">
              {{ daysRemaining }}
            </div>
            <div class="text-sm text-gray-400">
              {{ targetDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 翻转卡片的容器 */
.flip-container {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

/* 翻转卡片的效果 */
.flip-card {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: rotateY(0deg);
}

/* 翻转正面 */
.flip-card-front, .flip-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 正面样式 */
.flip-card-front {
  z-index: 2;
}

/* 反面样式 */
.flip-card-back {
  transform: rotateY(180deg);
}

/* 翻转时的样式 */
.flip-container:hover .flip-card {
  transform: rotateY(180deg);
}
</style>
