<script setup>
import CompleteDict from '@pinyin-pro/data/complete'
import { addDict, pinyin } from 'pinyin-pro'
import { onMounted, onUnmounted, ref } from 'vue'

addDict(CompleteDict)

const text = ref('归去，也无风雨也无晴')
const animatedLetters = ref([]) // Characters with visibility state
const charColors = ref([])
let intervalId = null
let fullCycleTimeoutId = null
// 是否启用拼音
const enablePinyin = ref(true)
const delayBetweenCycles = 2000

// Function to insert line breaks after punctuation
function formatTextWithLineBreaks(text) {
  return text.replace(/([。！？,；，、])/g, '$1\n')
}

const formattedText = ref(formatTextWithLineBreaks(text.value))

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

function showPinyin(pinyin, index, callback) {
  let letterIndex = 0
  animatedLetters.value[index] = { letter: '', isVisible: true }

  intervalId = setInterval(() => {
    animatedLetters.value[index].letter += pinyin[letterIndex]
    letterIndex++

    if (letterIndex === pinyin.length) {
      clearInterval(intervalId)
      callback?.()
    }
  }, 100)
}

function replaceWithChinese(chinese, index, callback) {
  setTimeout(() => {
    animatedLetters.value[index].letter = chinese
    callback?.()
  }, 500)
}

function deleteEffect(letters, callback) {
  let deleteIndex = letters.length - 1

  intervalId = setInterval(() => {
    if (deleteIndex >= 0) {
      animatedLetters.value[deleteIndex].isVisible = false
      deleteIndex--
    }
    else {
      clearInterval(intervalId)
      setTimeout(() => {
        animatedLetters.value = []
        callback?.() // 删除完成后触发回调
      }, 500)
    }
  }, 200)
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`
}

onUnmounted(() => {
  if (intervalId)
    clearInterval(intervalId)
  if (fullCycleTimeoutId)
    clearTimeout(fullCycleTimeoutId)
})

onMounted(() => {
  // 默认开始
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
  /* gap: 0.5rem; */
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

<!-- 标点符号之间会自动插入换行符，但中文字符之间不会自动插入换行符。 -->
