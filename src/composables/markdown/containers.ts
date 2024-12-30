import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownEnv } from 'unplugin-vue-markdown/types'
import container from 'markdown-it-container'
import { nanoid } from 'nanoid'

import {
  extractTitle,
  type Options,
} from './preWrapper'

type ContainerArgs = [typeof container, string, { render: RenderRule }]

export function containerPlugin(md: MarkdownIt, options: Options, containerOptions: Partial<ContainerOptions> = {}): void {
  const containers: Array<{ klass: string, label: keyof ContainerOptions }> = [
    { klass: 'tip', label: 'tipLabel' },
    { klass: 'info', label: 'infoLabel' },
    { klass: 'warning', label: 'warningLabel' },
    { klass: 'danger', label: 'dangerLabel' },
    { klass: 'details', label: 'detailsLabel' },
  ]

  containers.forEach(({ klass, label }) => {
    md.use(...createContainer(klass, containerOptions[label] || label.toUpperCase(), md))
  })

  md.use(container, 'v-pre', {
    render: (tokens: Token[], idx: number) =>
      tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`,
  })

  md.use(container, 'raw', {
    render: (tokens: Token[], idx: number) =>
      tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`,
  })
  md.use(...createCodeGroup(options, md))
}

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt,
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens: Token[], idx: number, _options: unknown, env: MarkdownEnv & { references?: Record<string, any> }) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        const attrs = md.renderer.renderAttrs(token)
        const title = md.renderInline(info || defaultTitle, {
          references: env.references,
        })

        if (token.nesting === 1) {
          if (klass === 'details') {
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`
        }
        else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      },
    },
  ]
}

function createCodeGroup(options: Options, md: MarkdownIt): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5)
          let tabs = ''
          let checked = 'checked'

          for (
            let i = idx + 1;
            !(
              tokens[i].nesting === -1
              && tokens[i].type === 'container_code-group_close'
            );
            ++i
          ) {
            const isHtml = tokens[i].type === 'html_block'

            if (
              (tokens[i].type === 'fence' && tokens[i].tag === 'code')
              || isHtml
            ) {
              const title = extractTitle(
                isHtml ? tokens[i].content : tokens[i].info,
                isHtml,
              )

              if (title) {
                const id = nanoid(7)
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label data-title="${md.utils.escapeHtml(title)}" for="tab-${id}">${title}</label>`

                if (checked && !isHtml)
                  tokens[i].info += ' active'
                checked = ''
              }
            }
          }

          return `<div class="code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></div>\n`
      },
    },
  ]
}

export interface ContainerOptions {
  tipLabel?: string
  infoLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
}
