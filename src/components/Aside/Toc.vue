<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tableOfContentsHtml = ref<string>('')

const progress = ref<number>(0)

function calculateReadingProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = Number.parseFloat(Math.min((scrollTop / scrollHeight) * 100, 100).toFixed(2))
}

function getContentsHtml() {
  const contents = document.querySelector('.table-of-contents')
  if (contents) {
    tableOfContentsHtml.value = contents.innerHTML
  }
}

function highlightOnScroll() {
  calculateReadingProgress()

  const headings = Array.from(
    document.querySelectorAll('.prose > h1, .prose > h2, .prose > h3, .prose > h4, .prose > h5, .prose > h6'),
  ) as HTMLElement[]

  let lastVisibleHeading = ''
  const bufferheight = 150 // 缓冲高度，避免滚动到顶部时高亮消失

  for (const heading of headings) {
    const rect = heading.getBoundingClientRect()
    if (rect.top - bufferheight <= 0 && rect.bottom + bufferheight >= 0) {
      lastVisibleHeading = heading.id
    }
  }

  // 高亮当前链接
  const activeLink = document.querySelector(
    `.toc a[href="#${lastVisibleHeading}"]`,
  )
  if (activeLink) {
    // 清除以前的高亮
    const links = document.querySelectorAll('.toc a')
    links.forEach(link =>
      link.classList.remove('active'),
    )
    // 高亮当前链接
    activeLink.classList.add('active')
  }
}

onMounted(() => {
  getContentsHtml()
  window.addEventListener('scroll', highlightOnScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', highlightOnScroll)
})

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      getContentsHtml()
      highlightOnScroll()
    }, 0)
  },
)
</script>

<template>
  <div v-if="tableOfContentsHtml" class="toc rounded-lg mb-4! aside">
    <div class="flex items-center p-10px">
      <h2 class="mb-2 text-2xl font-bold">
        <div class="i-ri-menu-2-fill inline-block text-lg" />
        目录
      </h2>
      <span class="absolute right-10px">{{ progress }} %</span>
    </div>
    <aside v-html="tableOfContentsHtml" />
  </div>
</template>

<style>
.toc {
  margin: 0 auto;
  padding: 10px;
}

.toc a {
  color: #555;
  display: block;
  padding: 4px 8px;
  text-decoration: none;
  transition: all 0.3s;
}

.toc a.active {
  color: var(--my-p-color);
  font-weight: bold;
  background: var(--my-p-bg-1);
  border-left: 4px solid var(--my-p-color);
}

.toc ul ul {
  padding-left: 1.5rem;
}
</style>
