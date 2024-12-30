if (typeof window !== 'undefined') {
  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement

    // 判断点击目标是否为 .code-group 内的 input
    if (!target.matches('.code-group input'))
      return

    // 获取父级容器和 blocks
    const groupContainer = target.closest('.code-group') as HTMLElement | null
    const blocksContainer = groupContainer?.querySelector('.blocks') as HTMLElement | null
    if (!groupContainer || !blocksContainer)
      return

    // 获取当前点击的索引
    const inputs = Array.from(groupContainer.querySelectorAll('input')) as HTMLInputElement[]
    const clickedIndex = inputs.indexOf(target as HTMLInputElement)
    if (clickedIndex < 0)
      return

    // 切换 active 类
    const activeBlock = blocksContainer.querySelector('.active') as HTMLElement | null
    const newBlock = blocksContainer.children[clickedIndex] as HTMLElement | undefined
    if (activeBlock === newBlock || !newBlock)
      return

    activeBlock?.classList.remove('active')
    newBlock.classList.add('active')

    // 滚动到对应标签
    const label = groupContainer.querySelector(`label[for="${target.id}"]`) as HTMLElement | null
    label?.scrollIntoView({ block: 'nearest' })
  })
}
