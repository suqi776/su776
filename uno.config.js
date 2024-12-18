// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-pink-300 text-white cursor-pointer hover:bg-pink-500 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 !outline-none'],
    ['aside', 'bg-#fff dark:bg-#0e0e0e'],
    ['card-action', 'bg-[var(--my-p-bg-1)]'],
    ['card-hover', 'hover:bg-[var(--my-p-hover-bg)] dark:hover:bg-[var(--my-p-hover-bg-dark)]'],
    ['card-border', 'border b-[var(--my-p-bg)]'],
    ['card-hover-text', 'hover:text-[var(--my-p-hover-bg)] dark:hover:text-[var(--my-p-hover-bg-dark)]'],
    ['aside-item', 'bg-#f5f5f7 dark:bg-#000'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
