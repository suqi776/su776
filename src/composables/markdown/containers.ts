import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type Token from 'markdown-it/lib/token.mjs';
import { nanoid } from 'nanoid';

import {
  extractTitle,
  getAdaptiveThemeMarker,
  type Options
} from './preWrapper';
import { MarkdownEnv } from 'unplugin-vue-markdown/types';

export const containerPlugin = (
  md: MarkdownIt,
  options: Options,
  containerOptions: Partial<ContainerOptions> = {}
): void => {
  const containers: Array<{ klass: string; label: keyof ContainerOptions }> = [
    { klass: 'tip', label: 'tipLabel' },
    { klass: 'info', label: 'infoLabel' },
    { klass: 'warning', label: 'warningLabel' },
    { klass: 'danger', label: 'dangerLabel' },
    { klass: 'details', label: 'detailsLabel' },
  ];

  containers.forEach(({ klass, label }) => {
    md.use(...createContainer(klass, containerOptions[label] || label.toUpperCase(), md));
  });

  md.use(container, 'v-pre', {
    render: (tokens: Token[], idx: number) =>
      tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
  });

  md.use(container, 'raw', {
    render: (tokens: Token[], idx: number) =>
      tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`
  });

};

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): [typeof container, string, { render: RenderRule }] {
  return [
    container,
    klass,
    {
      render(tokens: Token[], idx: number, _options: unknown, env: MarkdownEnv & { references?: Record<string, any> }) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        const attrs = md.renderer.renderAttrs(token);
        const title = md.renderInline(info || defaultTitle, {
          references: env.references
        });

        if (token.nesting === 1) {
          if (klass === 'details') {
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>\n`;
          }
          return `<div class="${klass} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`;
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`;
        }
      }
    }
  ];
}

export interface ContainerOptions {
  tipLabel?: string;
  infoLabel?: string;
  warningLabel?: string;
  dangerLabel?: string;
  detailsLabel?: string;
}
