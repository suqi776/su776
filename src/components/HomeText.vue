<script setup lang="ts">
import CompleteDict from '@pinyin-pro/data/complete'
import { addDict, pinyin } from 'pinyin-pro'
import { onMounted, onUnmounted, ref } from 'vue'

// 添加拼音词典
addDict(CompleteDict)

const text = ref('归去，也无风雨也无晴')
const animatedLetters = ref<{ letter: string, isVisible: boolean }[]>([]) // 用于存储带有可见状态的字符
const charColors = ref<string[]>([]) // 用于存储字符颜色

let intervalId: NodeJS.Timeout | null = null
let fullCycleTimeoutId: NodeJS.Timeout | null = null
const enablePinyin = ref(true) // 是否启用拼音
const delayBetweenCycles = 2000 // 每一轮动画完成后等待的时间

// 插入换行符（仅在标点符号后插入）
function formatTextWithLineBreaks(text: string): string {
  return text.replace(/([。！？,；，、])/g, '$1\n')
}

const formattedText = ref(formatTextWithLineBreaks(text.value))

// 开始拼音动画效果
function startEffect() {
  if (intervalId)
    clearInterval(intervalId)
  if (fullCycleTimeoutId)
    clearTimeout(fullCycleTimeoutId)

  const chineseChars = formattedText.value.split('')
  const pinyinArray = enablePinyin.value
    ? pinyin(formattedText.value, { toneType: 'none', type: 'array' })
    : chineseChars

  animatedLetters.value = []
  charColors.value = chineseChars.map(() => getRandomColor())

  let currentIndex = 0

  function nextChar() {
    if (currentIndex < chineseChars.length) {
      const currentPinyin = pinyinArray[currentIndex]
      const currentChinese = chineseChars[currentIndex]

      showPinyin(currentPinyin, currentIndex, () => {
        replaceWithChinese(currentChinese, currentIndex, () => {
          currentIndex++
          nextChar()
        })
      })
    }
    else {
      fullCycleTimeoutId = setTimeout(() => {
        deleteEffect(chineseChars, () => {
          startEffect() // 删除完成后重新开始动画
        })
      }, delayBetweenCycles)
    }
  }

  nextChar()
}

// 显示拼音动画
// eslint-disable-next-line ts/no-unsafe-function-type
function showPinyin(pinyin: string, index: number, callback: Function) {
  let letterIndex = 0
  animatedLetters.value[index] = { letter: '', isVisible: true }

  intervalId = setInterval(() => {
    animatedLetters.value[index].letter += pinyin[letterIndex]
    letterIndex++

    if (letterIndex === pinyin.length) {
      clearInterval(intervalId as NodeJS.Timeout)
      callback?.()
    }
  }, 100)
}

// 替换为中文字符
// eslint-disable-next-line ts/no-unsafe-function-type
function replaceWithChinese(chinese: string, index: number, callback: Function) {
  setTimeout(() => {
    animatedLetters.value[index].letter = chinese
    callback?.()
  }, 500)
}

// 删除效果
// eslint-disable-next-line ts/no-unsafe-function-type
function deleteEffect(letters: string[], callback: Function) {
  let deleteIndex = letters.length - 1

  intervalId = setInterval(() => {
    if (deleteIndex >= 0) {
      animatedLetters.value[deleteIndex].isVisible = false
      deleteIndex--
    }
    else {
      clearInterval(intervalId as NodeJS.Timeout)
      setTimeout(() => {
        animatedLetters.value = []
        callback?.() // 删除完成后触发回调
      }, 500)
    }
  }, 200)
}

// 随机生成颜色
function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`
}

// 页面卸载时清除定时器
onUnmounted(() => {
  if (intervalId)
    clearInterval(intervalId as NodeJS.Timeout)
  if (fullCycleTimeoutId)
    clearTimeout(fullCycleTimeoutId as NodeJS.Timeout)
})

// 页面加载时开始动画
onMounted(() => {
  startEffect()
})
</script>

<template>
  <div>
    <div class="output">
      <span
        v-for="(item, index) in animatedLetters"
        :key="index"
        :class="{ visible: item.isVisible, hidden: !item.isVisible }"
        :style="{ color: charColors[index] }"
      >
        {{ item.letter }}
      </span>
      <span class="flash">_</span>
    </div>
  </div>
</template>

<style scoped>
.output {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  white-space: pre-wrap; /* 保证换行符生效 */
}

span {
  transition: opacity 0.5s ease, transform 0.5s ease;
  white-space: pre-wrap; /* 保证换行符生效 */
}

span.visible {
  opacity: 1;
  transform: rotate(360deg); /* 顺时针旋转 */
}

span.hidden {
  opacity: 0;
  transform: rotate(-360deg); /* 逆时针旋转 */
}

span.removing {
  opacity: 0;
  transform: rotate(-360deg); /* 删除动画旋转 */
  transition: opacity 0.5s ease, transform 0.5s ease;
}

span.flash {
  animation: flash-animation 1s infinite alternate;
}

@keyframes flash-animation {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
