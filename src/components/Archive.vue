<script setup lang='ts'>
import usePostsData from '../composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()

// 分页状态
const currentPage = ref(1)
const pageSize = 10

// 获取按日期排序的文章
const sortedPosts = computed(() => {
  return posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// 按年份分组并分页
const groupedPaginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  const paginatedPosts = sortedPosts.value.slice(start, end)

  const groups: Record<string, typeof paginatedPosts> = {}
  paginatedPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
  })

  return new Map(
    Object.entries(groups).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)),
  )
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(sortedPosts.value.length / pageSize)
})

// 切换页面
function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 随机配图
function randomImages() {
  const imgNum = Math.floor(Math.random() * 5) + 1
  return `url(/blog0${imgNum}.jpg)`
}

function blogListImagesSize() {
  return {
    backgroundImage: randomImages(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}
</script>

<template>
  <div class="min-h-screen p-6">
    <!-- 页面标题 -->
    <h1 class="mb-4 text-4xl font-bold">
      所有文章 - {{ posts.length }}
    </h1>

    <!-- 按年份分组文章列表 -->
    <div v-for="[year, postList] of groupedPaginatedPosts" :key="year" class="mb-8">
      <!-- 年份标题 -->
      <h2 v-if="postList.length" class="mb-6 text-2xl font-semibold">
        {{ year }}
      </h2>

      <!-- 文章列表 -->
      <div class="space-y-6">
        <div
          v-for="(item, index) in postList"
          :key="index"
        >
          <RouterLink :to="item.path" class="flex items-center">
            <div class="h-20 w-32 overflow-hidden border-2 rounded-lg">
              <!-- 配图 -->
              <img
                :style="blogListImagesSize()"
                class="h-full w-full scale-105 transform overflow-hidden object-cover transition-transform duration-600 hover:scale-125"
              >
            </div>

            <!-- 内容 -->
            <div class="ml-4 card-hover-text">
              <div class="mb-1 flex items-center text-sm text-gray-400">
                <div class="i-carbon-calendar-heat-map mr-2" />
                {{ item.date }}
              </div>
              <h3 class="transform text-xl font-semibold transition-all duration-500">
                {{ item.title }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
      <!-- 上一页按钮 -->
      <button
        v-if="currentPage !== 1"
        class="aside-item h-10 w-10 flex items-center justify-center rounded-lg transition"
        @click="changePage(currentPage - 1)"
      >
        «
      </button>

      <!-- 页码按钮 -->
      <button
        v-for="page in totalPages"
        :key="page"
        class="h-10 w-10 flex items-center justify-center rounded-lg transition" :class="[
          currentPage === page
            ? 'card-action'
            : 'aside-item',
        ]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <!-- 下一页按钮 -->
      <button
        v-if="currentPage !== totalPages"
        class="aside-item h-10 w-10 flex items-center justify-center rounded-lg transition"
        @click="changePage(currentPage + 1)"
      >
        »
      </button>
    </div>
  </div>
</template>
