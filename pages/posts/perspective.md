---
title: 记录 CSS perspective 属性：实现 3D 效果与卡片翻转
date: 2024-12-27 11:00:00
tags:
  - css
  - vue
category:
  - 前端
type: post
imgURL: https://s2.loli.net/2024/10/29/M5d9BOwZSeHlcLF.jpg
---
[[toc]]
## 偶然
浏览网站的时候发现一个有趣的翻转效果，于是研究了一下发现 CSS 的 perspective 属性，发现它可以实现 3D 效果，并且可以让元素在 3D 空间中进行旋转。记录一下。

## 什么是 perspective？
CSS 中的 perspective 属性用于在三维空间中为元素设置透视效果。通过控制观察者与元素之间的距离，perspective 决定了元素在 Z 轴上的深度感。这个属性通常与 transform 配合使用，帮助我们在网页中实现栩栩如生的 3D 动画效果。

### 透视原理
小的 perspective 值：使元素显得更加立体，仿佛它离观察者很近，深度感更强。
大的 perspective 值：使元素显得较为平面，仿佛它离观察者较远，深度感较弱。

## perspective 的语法
```css
element {
  perspective: <length>;
}
```
`<length>`指定透视的距离，通常使用像素（px）或其他长度单位（如 em）。较小的值会让元素看起来更加立体，较大的值则会让元素显得更为平坦。

## 创建 3D 卡片翻转效果
### HTML 结构
```html
<div class="container">
  <div class="flip-card">
    <div class="flip-card-front">
      正面内容
    </div>
    <div class="flip-card-back">
      背面内容
    </div>
  </div>
</div>
```
### CSS 样式
```css
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
```
## 效果预览
<Dome1 />

## 参考
<CountdownCard :is-title="false" class="w-350px!"/>
