import { parseMarkdown } from './parse-markdown.ts'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import type { PostData } from '../types.d.ts'

(async function(): Promise<void> {
  const __dirname = fileURLToPath(import.meta.url)
  const postsPath = path.resolve(__dirname, '../../posts')
  const files = fs.readdirSync(postsPath, {})
  const postsOutputDir = path.resolve(__dirname, '../../dist/posts')

  const data: Array<PostData> = []

  for (const [i, filename] of files.entries()){
    const filePath = path.join(postsPath, filename as string)
    const html = await parseMarkdown(filePath)

    const stats = await fsPromises.stat(filePath)
    const fileContent = await fsPromises.readFile(filePath, 'utf-8')

    const htmlFilename = (filename as string).replace('.md', '.html')

    data.push({
      id: i.toString(),
      filename: htmlFilename,
      title: getTitle((htmlFilename)), 
      brief: getBrief(fileContent),
      created: stats.birthtime,
      modified: stats.mtime
    })

    const outputFile = path.join(postsOutputDir, htmlFilename)

    // make sure the folder exists
    await fsPromises.mkdir(postsOutputDir, {recursive: true})

    // write the file
    await fsPromises.writeFile(outputFile, html, 'utf-8')
      .then(() => console.log(chalk.green(`✔ ${filename} built`)))
      .catch(error => console.error(error))
  }

  const jsonPosts = JSON.stringify(data)

  console.log(jsonPosts)

  fs.writeFileSync(`${postsOutputDir}/data.json`, jsonPosts)

  console.log(chalk.yellow('All posts have been parsed into HTML ✅'))
})()


function getTitle(htmlFilename: string): string {
  return htmlFilename.replace('.html', '').replaceAll('-',' ')
}

function getBrief(fileContent: string): string {
  return fileContent.split('\n')[0]
}