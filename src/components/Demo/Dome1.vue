<script setup lang='ts'>

</script>

<template>
  <div class="m-6 rounded-lg p-2 container">
    <div class="flip-card">
      <div class="flip-card-front">
        正面内容
      </div>
      <div class="flip-card-back">
        背面内容
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 设置容器的透视效果 */
.container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 翻转卡片的效果 */
.flip-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

/* 正面和背面 */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* 背面翻转 */
.flip-card-back {
  transform: rotateY(180deg);
}

/* 鼠标悬停触发翻转 */
.container:hover .flip-card {
  transform: rotateY(180deg);
}
</style>
