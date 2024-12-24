<script setup lang="ts">
import { usePostsData } from '../composables/posts.data'

type PostType = 'tags' | 'category'

// 接收父组件传递的属性
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  routePrefix: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => PostType, // 声明 type 是一个 PostType 类型
    required: true,
  },
})

// 获取所有文章数据
const posts = usePostsData()

// 计算每个项的颜色
function getItemColor(item: string) {
  const hue = (item.charCodeAt(0) * 137.508) % 360
  return `hsl(${hue}, 50%, 50%)`
}

// 获取所有type类型的数据并去重
const items: string[] = [
  ...new Set(
    posts
      .flatMap(post => post[props.type] ?? []) // 使用 props.type 动态访问字段
      .filter(category => category !== ''), // 过滤空值
  ),
]

// 计算每个标签的个数
const itemCounts = items.map((item) => {
  return posts.filter(post => post[props.type]?.includes(item)).length
})
</script>

<template>
  <div class="p-7">
    <div class="mb-5 flex flex-col items-center justify-between">
      <h2 class="mb-5 text-3xl font-bold">
        {{ title }}
      </h2>
      <div class="text-sm text-gray-400">
        共有{{ items.length }}个{{ title }}
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <RouterLink
        v-for="(item, index) in items"
        :key="item"
        :to="`${routePrefix}/${item}`"
        :style="`color: ${getItemColor(item)};`"
        class="p-0.4em text-xl font-bold transition-transform duration-200 ease-in-out hover:scale-110 xl:text-4xl card-hover-text!"
      >
        {{ item }}
        <span class="absolute text-sm xl:text-xl">
          {{ itemCounts[index] }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>
