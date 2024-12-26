<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

// 定义接口数据
interface Data {
  ip: string // IP 地址
  nation: string // 国家
  province: string // 省份
  city: string // 城市
  district: string // 区
  adcode: number // 行政区划代码
  lat: number // 纬度
  lng: number // 经度
}

const ipInfo = ref<Data>() // 用户 IP 信息

const distance = ref<number>(0) // 用户距离目标地点的距离（单位：公里）

const targetLat = 31.2304 // 上海纬度
const targetLon = 121.4737 // 上海经度

// Haversine 公式计算距离
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  distance.value = Number.parseFloat((R * c).toFixed(1)) // 返回一位小数
}

// 获取数据的函数
function fetchData() {
  try {
    axios.get('https://api.nsmao.net/api/ip/query', {
      params: {
        key: 'sTyrzimgoEIIOTNwNQ1fCyLtll',
      },
      timeout: 5000, // 超时时间
    }).then((response) => {
      ipInfo.value = response.data.data // 赋值响应式变量
      if (ipInfo.value) {
        calculateDistance(ipInfo.value?.lat, ipInfo.value?.lng, targetLat, targetLon)
      }
    }).catch((error) => {
      console.error('请求失败', error) // 请求失败处理
    })
  }
  catch (error) {
    console.error('获取数据出错：', error)
  }
}

// 页面加载时调用
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="mb-2 rounded-lg p-6 aside">
    <h2 class="mb-2 text-2xl font-bold">
      问候
    </h2>
    <p>欢迎来自 <span class="cursor-pointer text-[var(--my-p-bg)] font-bold">{{ ipInfo?.province }}{{ ipInfo?.city }}</span> 的小伙伴！</p>
    <p>我们距离约有 {{ distance }} 公里！</p>
    <p>您的IP地址为：{{ ipInfo?.ip }}</p>
  </div>
</template>
