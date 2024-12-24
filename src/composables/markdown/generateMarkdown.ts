import path from 'node:path'
import fs from 'fs-extra'
import shorts from '../../data/shorts.json'

export function generateMarkdown() {
  const shortsDir = './pages/shorts'

  // 先清除除了 index.md 外的所有文件
  fs.readdir(shortsDir).then((files) => {
    files.forEach((file) => {
      // 保留 index.md，删除其他文件
      if (file !== 'index.md') {
        const filePath = path.join(shortsDir, file)
        fs.remove(filePath)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log(`✅ Deleted old file: ${filePath}`)
          })
          .catch((err) => {
            console.error(`❌ Error deleting file ${filePath}:`, err)
          })
      }
    })
  }).catch((err) => {
    console.error('❌ Error reading directory:', err)
  })

  shorts.forEach((item, index) => {
    const { title, date, imgURL } = item

    // 创建 Markdown 内容
    const markdownContent = `---
  title: ${title}
  date: ${date}
  type: shorts
  imgURL: ${imgURL}
---

![${title}](${imgURL})

${title}
`

    // 确保 public 目录存在
    const filePath = `./pages/shorts/shorts${index + 1}.md`

    fs.ensureDir('./pages/shorts').then(() => {
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
    }).catch((err) => {
      console.error('❌ Error ensuring directory:', err)
    })
  })
}
