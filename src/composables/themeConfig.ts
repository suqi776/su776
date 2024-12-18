export const colors = ref([
  { name: 'default', value: '#ff69b4', isActive: false },
  { name: 'emerald', value: '#10b981', isActive: false },
  { name: 'green', value: '#22c55e', isActive: false },
  { name: 'lime', value: '#84cc16', isActive: false },
  { name: 'orange', value: '#f97316', isActive: false },
  { name: 'amber', value: '#f59e0b', isActive: false },
  { name: 'yellow', value: '#eab308', isActive: false },
  { name: 'teal', value: '#14b8a6', isActive: false },
  { name: 'cyan', value: '#06b6d4', isActive: false },
  { name: 'sky', value: '#0ea5e9', isActive: false },
  { name: 'blue', value: '#3b82f6', isActive: false },
  { name: 'indigo', value: '#6366f1', isActive: false },
  { name: 'violet', value: '#8b5cf6', isActive: false },
  { name: 'purple', value: '#a855f7', isActive: false },
  { name: 'fuchsia', value: '#d946ef', isActive: false },
  { name: 'pink', value: '#ec4899', isActive: false },
  { name: 'rose', value: '#f43f5e', isActive: false },
])

export function hexToRgba(hex: string, alpha: number, num = { r: 0, g: 0, b: 0 }): string {
  const r = Number.parseInt(hex.slice(1, 3), 16) - num.r
  const g = Number.parseInt(hex.slice(3, 5), 16) - num.g
  const b = Number.parseInt(hex.slice(5, 7), 16) - num.b
  return `rgb(${r}, ${g}, ${b}, ${alpha})`
}

export function setDefaultColors(color: string) {
  document.documentElement.style.setProperty('--my-p-bg', hexToRgba(color, 0.7))
  document.documentElement.style.setProperty('--my-p-color', hexToRgba(color, 1))
  document.documentElement.style.setProperty('--my-p-bg-1', hexToRgba(color, 0.1))
  document.documentElement.style.setProperty('--my-p-hover-bg', hexToRgba(color, 1))
  document.documentElement.style.setProperty('--my-p-hover-bg-dark', hexToRgba(color, 1, { r: 9, g: 11, b: 8 }))
}

export function initializeColors() {
  const savedColor = localStorage.getItem('selectedColor')
  if (savedColor) {
    const colorIndex = colors.value.findIndex(c => c.value === savedColor)
    if (colorIndex !== -1) {
      setActiveColor(colorIndex)
    }
  }
}

export function setActiveColor(index: number) {
  colors.value.forEach((color, idx) => {
    if (idx === index) {
      color.isActive = true
      setDefaultColors(color.value)
      localStorage.setItem('selectedColor', color.value) // 保存颜色到本地存储
    }
    else {
      color.isActive = false
    }
  })
}
