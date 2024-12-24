import fs from 'fs-extra'
import shorts from './shorts.json'

export function generateMarkdown() {
  shorts.forEach((item, index) => {
    const { title, date, imgURl } = item

    // 创建 Markdown 内容
    const markdownContent = `---
  title: ${title}
  date: ${date}
  type: shorts
  imgURl: ${imgURl}
---

![${title}](${imgURl})

${title}
`

    // 确保 public 目录存在
    const filePath = `./pages/shorts/shorts${index + 1}.md`

    fs.ensureDir('./pages/shorts')
      .then(() => {
        // 写入每个 Markdown 文件
        fs.writeFile(filePath, markdownContent, (err) => {
          if (err) {
            console.error(`❌ Error creating file ${filePath}:`, err)
          }
          else {
            // eslint-disable-next-line no-console
            console.log(`✅ Markdown file successfully created: ${filePath}`)
          }
        })
      })
      .catch((err) => {
        console.error('❌ Error ensuring directory:', err)
      })
  })
}
