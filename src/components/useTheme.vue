<script setup lang="ts">
import { colors, setActiveColor } from '../composables/themeConfig'
</script>

<template>
  <div class="h-400px w-16rem rounded-lg p-6 aside">
    <div class="mb-2 text-center text-lg font-bold">
      小小色板
    </div>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(c, index) in colors"
        :key="index"
        class="flex flex-col cursor-pointer items-center justify-center"
        @click="setActiveColor(index)"
      >
        <div
          class="my-transition h-6 w-6 flex items-center justify-center border-2 border-gray-300 rounded-full"
          :class="{ 'scale-110': c.isActive }"
        >
          <button
            :style="{ backgroundColor: c.value }"
            :class="{ 'border-2px border-black': c.isActive }"
            class="my-transition h-5 w-5 rounded-full"
            :title="c.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
