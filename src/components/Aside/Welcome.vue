<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

// 定义响应式变量
const location = ref<string>('') // 用户位置
const distance = ref<number>(0) // 距离
const ip = ref<string>('') // 用户 IP

// Haversine 公式计算距离
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number.parseFloat((R * c).toFixed(1)) // 返回一位小数
}

// 获取数据的函数
async function fetchData() {
  try {
    // 第一步：获取用户 IP 地址
    const ipResponse = await axios.get('https://apis.map.qq.com/ws/geocoder/v1?location=28.7033487,115.8660847&key=VIEBZ-FZTYZ-IEHXX-ZDAZ4-JVMD2-YMFOC')

    console.log(ipResponse)
    // ip.value = ipResponse.data.ip

    // // 第二步：通过 IP 获取地理位置
    // const locationResponse = await axios.get(`http://ip-api.com/json/${ip.value}?lang=zh-CN`)
    // const data = locationResponse.data
    // location.value = `${data.city}`

    // // 第三步：计算距离（目标地点：广州坐标 23.1291, 113.2644）
    // const targetLat = 23.1291
    // const targetLon = 113.2644
    // distance.value = calculateDistance(data.lat, data.lon, targetLat, targetLon)
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
    <p>欢迎来自 {{ location }} 的小伙伴🍂</p>
    <p>众所周知，中国只有两个城市！</p>
    <p>我们距离约有 {{ distance }} 公里！</p>
    <p>您的IP地址为：{{ ip }}</p>
  </div>
</template>
