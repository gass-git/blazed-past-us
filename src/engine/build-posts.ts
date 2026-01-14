import { parseMarkdown } from './parse-markdown.ts';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import type { PostData } from './types';

(function main() {
  const projectRoot = process.cwd();
  const paths = initPaths(projectRoot);
  parse(paths);
})();

function initPaths(root: string) {
  const posts = {
    inputPath: path.resolve(root, 'posts'),
    outputPath: path.resolve(root, 'dist/posts'),
  };

  const postFiles = fs.readdirSync(posts.inputPath, {}) as string[];
  return { posts, postFiles };
}

async function parse({
  posts,
  postFiles,
}: {
  posts: {
    inputPath: string;
    outputPath: string;
  };
  postFiles: Array<string>;
}): Promise<void> {
  const data: Array<PostData> = [];

  for (const [i, filename] of postFiles.entries()) {
    const filePath = path.join(posts.inputPath, filename as string);

    const html = await parseMarkdown(filePath);
    const stats = await fsPromises.stat(filePath);
    const fileContent = await fsPromises.readFile(filePath, 'utf-8');
    const htmlFilename = (filename as string).replace('.md', '.html');
    const tags = getTags(fileContent);

    data.push({
      id: i.toString(),
      filename: htmlFilename,
      title: getTitle(htmlFilename),
      brief: getBrief(fileContent),
      tags: tags,
      created: stats.birthtime,
      modified: stats.mtime,
    });

    const outputFile = path.join(posts.outputPath, htmlFilename);

    // make sure the folder exists
    await fsPromises.mkdir(posts.outputPath, { recursive: true });

    // write the file
    await fsPromises
      .writeFile(outputFile, html, 'utf-8')
      .then(() => console.log(chalk.green(`✔ ${filename} built`)))
      .catch((error) => console.error(error));
  }

  const jsonPosts = JSON.stringify(data);
  fs.writeFileSync(`${posts.outputPath}/data.json`, jsonPosts);
  console.log(chalk.yellow('All posts have been parsed into HTML ✅'));
}

function getTitle(htmlFilename: string): string {
  return htmlFilename.replace('.html', '').replaceAll('-', ' ');
}

function getBrief(fileContent: string): string {
  return (
    fileContent
      .split('\n')
      .find((str) => !str.includes('tags') && str.length > 10) || ''
  );
}

function getTags(fileContent: string) {
  return (
    fileContent
      .split('\n')
      ?.find((str) => str.includes('**tags:**'))
      ?.split('**tags:**')
      ?.slice(1)[0]
      ?.split(',')
      .map((str) => str.trim()) || []
  );
}
