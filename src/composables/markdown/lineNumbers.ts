/* eslint-disable regexp/no-unused-capturing-group */
// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type MarkdownIt from 'markdown-it'

export function lineNumberPlugin(md: MarkdownIt, enable = false) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)

    const [tokens, idx] = args
    const info = tokens[idx].info

    if (
      (!enable && !/:line-numbers($| |=)/.test(info))
      || (enable && /:no-line-numbers($| )/.test(info))
    ) {
      return rawCode
    }

    let startLineNumber = 1
    const matchStartLineNumber = info.match(/=(\d*)/)
    if (matchStartLineNumber && matchStartLineNumber[1]) {
      startLineNumber = Number.parseInt(matchStartLineNumber[1])
    }

    // const code = rawCode.slice(
    //   rawCode.indexOf('<code>'),
    //   rawCode.indexOf('</code>'),
    // )

    
    // 使用正则表达式来匹配代码块，避免了使用字符串操作来匹配代码块
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const code = rawCode.match(/<code.*?>([\s\S]*?)<\/code>/)?.[1] || ''

    const lines = code.split('\n')

    const lineNumbersCode = [...Array.from({ length: lines.length })]
      .map(
        (_, index) =>
          `<span class="line-number">${index + startLineNumber}</span><br>`,
      )
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
