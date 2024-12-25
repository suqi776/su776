---
layout: Posts
---

<!-- @layout-full-width -->
<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsData } from '../../src/composables/posts.data'

// 获取所有文章数据
const posts = usePostsData()
// 获取文章数量
const type = posts.length
</script>

<PostsType :posts="posts" title="文章列表" :type="type" />
