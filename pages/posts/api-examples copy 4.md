---
title: 置顶文章
date: 2024-01-11
tags:
  - API
  - Examples
  - Top
category:
  - Examples
---

[[toc]]

## API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```vue
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>
{{ theme }}
</pre>

### Page Data
<pre>
{{ page }}
</pre>

### Page Frontmatter
<pre>
{{ frontmatter }}
</pre>
```

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
