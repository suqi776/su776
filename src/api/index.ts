/**
 * 获取一言
 */
export async function getHitokoto() {
  const result = await fetch('https://v1.hitokoto.cn')
  const hitokoto = await result.json()
  return hitokoto
}

export async function fetchHitokoto() {
  const response = await fetch('api')
  const hitokoto = await response.json()
  return hitokoto
}
