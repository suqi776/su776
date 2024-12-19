/* eslint-disable regexp/no-unused-capturing-group */
// 复制代码块功能
if (typeof window !== "undefined") {
  window.addEventListener('click', (e) => {
    try {
      const el = e.target as HTMLElement // 显式声明类型
      const timeoutIdMap: WeakMap<HTMLElement, NodeJS.Timeout> = new WeakMap()
      if (el.matches('div[class*="language-"] > button.copy')) { // 不再需要检查el是否存在，因为matches方法会在el为null时抛出错误
        el.classList.add('copied') // 使用classList来添加类名

        const parent = el.parentElement
        const sibling = el.nextElementSibling?.nextElementSibling
        if (!parent || !sibling) {
          return
        }

        const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(
          parent.className,
        )

        const ignoredNodes = ['.vp-copy-ignore', '.diff.remove']

        // Clone the node and remove the ignored nodes
        const clone = sibling.cloneNode(true) as HTMLElement
        clone
          .querySelectorAll(ignoredNodes.join(','))
          .forEach(node => node.remove())

        let text = clone.textContent || ''

        if (isShell) {
          text = text.replace(/^ *(\$|>) /gm, '').trim()
        }

        copyToClipboard(text).then(() => {
          el.classList.add('copied')
          clearTimeout(timeoutIdMap.get(el))
          const timeoutId = setTimeout(() => {
            el.classList.remove('copied')
            el.blur()
            timeoutIdMap.delete(el)
          }, 2000)
          timeoutIdMap.set(el, timeoutId)
        })
        setTimeout(() => {
          el.classList.remove('copied') // 3秒后移除复制成功标识
        }, 3000)
      }
    }
    catch (error) {
      console.error('Error handling click event:', error) // 错误处理
    }
  })

  async function copyToClipboard(text: string) {
    try {
      return navigator.clipboard.writeText(text)
    }
    catch {
      const element = document.createElement('textarea')
      const previouslyFocusedElement = document.activeElement

      element.value = text

      // Prevent keyboard from showing on mobile
      element.setAttribute('readonly', '')

      element.style.contain = 'strict'
      element.style.position = 'absolute'
      element.style.left = '-9999px'
      element.style.fontSize = '12pt' // Prevent zooming on iOS

      const selection = document.getSelection()
      const originalRange = selection
        ? selection.rangeCount > 0 && selection.getRangeAt(0)
        : null

      document.body.appendChild(element)
      element.select()

      // Explicit selection workaround for iOS
      element.selectionStart = 0
      element.selectionEnd = text.length

      document.execCommand('copy')
      document.body.removeChild(element)

      if (originalRange) {
        selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
        selection!.addRange(originalRange)
      }

      // Get the focus back on the previously focused element, if any
      if (previouslyFocusedElement) {
        ;(previouslyFocusedElement as HTMLElement).focus()
      }
    }
  }
}
