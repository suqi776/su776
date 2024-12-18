<script setup lang='ts'>
import dayjs from 'dayjs'
// 定义组件的属性
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

// 创建一个引用，用于访问文章内容
const content = ref<HTMLDivElement>()

const date = computed(() => {
  return dayjs(frontmatter.date).format('YYYY年MM月DD日 HH:mm:ss')
})

useHead({
  title: frontmatter.layout === 'Home'
    ? `Su77's Blog`
    : `${frontmatter.layout ? `${frontmatter.layout} - ` : `${frontmatter.title} -`} Su77's Blog`,
})
</script>

<template>
  <div v-if="!frontmatter.layout" class="mx-auto max-w-1300px flex p-1">
    <div class="h-350px w-full flex flex-col items-center justify-center rounded-lg">
      <!-- 如果存在标题则显示标题 -->
      <h1 class="slide-enter-50 mb-0 text-5xl font-bold">
        {{ frontmatter.title ?? '未命名' }}
      </h1>
      <div class="m-1 flex items-center text-gray-500 dark:text-gray-400">
        <div class="i-carbon-calendar-heat-map mr-1" />
        <span>{{ date }}</span>
      </div>
      <div v-if="frontmatter.tags" class="flex items-center text-gray-500 dark:text-gray-400">
        <div class="i-carbon-tag mr-1" />
        <div>
          <RouterLink v-for="(tag, index) in frontmatter?.tags || []" :key="index" :to="`/tags/${tag}`" class="cursor-pointer rounded-lg p-1 card-hover-text">
            {{ tag }}
          </RouterLink>
        </div>
      </div>
      <div class="flex items-center text-gray-500 dark:text-gray-400">
        <div class="i-carbon-category mr-1" />
        <div v-if="frontmatter.category">
          <RouterLink v-for="(c, index) in frontmatter?.category || []" :key="index" :to="`/category/${c}`" class="cursor-pointer rounded-lg p-1 card-hover-text">
            {{ c }}
          </RouterLink>
        </div>
        <span v-else class="cursor-pointer rounded-lg p-1 card-hover-text">{{ frontmatter.category ?? '未分类' }}</span>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-1300px flex p-1">
    <!-- 文章内容 -->
    <div
      class="w-full xl:w-[calc(100%-300px)]"
      :class="{
        'aside': frontmatter.layout !== 'Home',
        'rounded-lg': frontmatter.layout !== 'Home',
        'p-2.5em': frontmatter.layout !== 'Home',
      }"
    >
      <!-- 文章内容引用 -->
      <article ref="content">
        <slot />
      </article>

      <Twikoo v-if="!frontmatter.layout" />
    </div>

    <Aside class="ml-2 w-300px" />
  </div>
</template>
