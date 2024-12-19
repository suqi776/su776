<script setup lang="ts">
import { computed, ref } from 'vue'

import usePostsData from '../composables/posts.data'

const posts = usePostsData()

// 分页相关状态
// 每页显示的帖子数
const postsPerPage = 5
const currentPage = ref(1)

// 计算分页数据
const totalPages = computed(() => Math.ceil(posts.length / postsPerPage))
const paginatedRoutes = computed(() =>
  posts.slice((currentPage.value - 1) * postsPerPage, currentPage.value * postsPerPage),
)

// 使用 vueuse 提供的 useScroll 来控制滚动位置
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // 回到顶部
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // })
  }
}

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
    height: '280px',
  }
}
</script>

<template>
  <nav class="rounded-lg transition">
    <!-- <div class="mb-2 h-50px flex justify-between rounded-lg aside">
      11
    </div> -->
    <!-- 帖子列表 -->
    <ul>
      <li v-for="(post, index) in paginatedRoutes" :key="post.path">
        <RouterLink
          :to="post.path"
          class="group mb-2 contents xl:flex justify-between rounded-lg aside"
        >
          <!-- 图片 -->
          <div
            :class="{ 'order-1 rounded-bl-lg rounded-tl-lg': index % 2 === 0, 'order-2 rounded-br-lg rounded-tr-lg': index % 2 !== 0 }"
            class="w-100% xl:w-42% overflow-hidden"
            
          >
            <div
              :style="blogListImagesSize()"
              :class="{ 'rounded-bl-lg rounded-tl-lg': index % 2 === 0, 'rounded-br-lg rounded-tr-lg': index % 2 !== 0 }"
              class="my-transition group-hover:scale-110"
            />
          </div>

          <!-- 文章内容 -->
          <div
            :class="{ 'order-2': index % 2 === 0, 'order-1 items-end': index % 2 !== 0 }"
            class="h-150px w-100% xl:h-280px xl:w-58% flex flex-col justify-center rounded-lg p-1 px-8 py-10 text-lg font-medium"
          >
            <h2 class="mb-6 text-3xl font-semibold card-hover-text">
              {{ post.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              发表于{{ post.date }}
            </p>
            <div v-if="post.tags" class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <div class="i-carbon-tag mr-1" /> {{ post?.tags && post.tags.join(', ') }}
              </div>
            </div>
            <div v-if="post.category" class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <div class="i-carbon-category mr-1" />{{ post?.category && post.category.join(', ') }}
              </div>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>

    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
      <!-- 上一页按钮 -->
      <button
        v-if="currentPage !== 1"
        class="h-10 w-10 flex items-center justify-center rounded-lg transition aside"
        @click="goToPage(currentPage - 1)"
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
            : 'aside',
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <!-- 下一页按钮 -->
      <button
        v-if="currentPage !== totalPages"
        class="h-10 w-10 flex items-center justify-center rounded-lg transition aside"
        @click="goToPage(currentPage + 1)"
      >
        »
      </button>
    </div>
  </nav>
</template>

<style scoped>
</style>
