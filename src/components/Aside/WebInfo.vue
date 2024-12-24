<script setup lang="ts">
import { usePostsData } from '../../composables/posts.data'

const posts = usePostsData()

// 计算最后更新的时间差（如果超过1年显示年/月/天，超过30天显示月/天，小于30天显示天数）
function getLastUpdated(date: string) {
  const postDate = new Date(date)
  const currentDate = new Date()

  // 计算日期差距（毫秒）
  const diffInMilliseconds = currentDate.getTime() - postDate.getTime()
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000) // 转换为秒
  const diffInMinutes = Math.floor(diffInSeconds / 60) // 转换为分钟
  const diffInHours = Math.floor(diffInMinutes / 60) // 转换为小时
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) // 转换为天数

  // 如果小于1小时，显示分钟数
  if (diffInHours < 1) {
    if (diffInMinutes < 1) {
      return '刚刚'
    }
    return `${diffInMinutes}分钟前`
  }

  // 如果小于1天，显示小时数
  if (diffInDays < 1) {
    return `${diffInHours}小时前`
  }

  // 计算年、月和天
  const years = Math.floor(diffInDays / 365) // 近似计算年份
  const months = Math.floor((diffInDays % 365) / 30) // 计算剩余月份
  const remainingDays = diffInDays - years * 365 - months * 30 // 计算剩余天数

  // 如果超过1年，返回年/月/天格式
  if (years > 0) {
    return `${years}年 ${months}个月 ${remainingDays}天前`
  }

  // 如果小于1年但超过30天，返回月数和天数
  if (diffInDays >= 30) {
    return `${months}个月 ${remainingDays}天前`
  }

  // 否则返回天数
  return `${diffInDays}天前`
}
</script>

<template>
  <div class="rounded-lg p-6 aside">
    <h1 class="mb-3 text-3xl font-bold">
      网站信息
    </h1>
    <ul class="text-#555 space-y-3">
      <li class="flex justify-between">
        <span>文章数目:</span>
        <span>{{ posts.length }}</span>
      </li>
      <li class="flex justify-between">
        <span>最后更新:</span>
        <span>{{ getLastUpdated(posts[0].date) }}</span>
      </li>
    </ul>
  </div>
</template>
