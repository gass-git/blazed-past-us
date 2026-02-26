import chalk from 'chalk';
import { getTitle, getBrief, getTags, getSlug } from '../engine/getters.js';
import { PostMetadata } from '../types';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

async function writeTransformedPostFile(
  outputPath: string,
  postHtmlContent: string,
  filename: string
): Promise<void> {
  await fsPromises
    .writeFile(outputPath, postHtmlContent, 'utf-8')
    .then(() => console.log(chalk.green(`✔ ${filename}`)))
    .catch((error) => console.error(error));
}

async function generatePostMetadata(
  data: Array<PostMetadata>,
  filePath: string,
  htmlFilename: string,
  postTags: string[]
): Promise<void> {
  const stats = await fsPromises.stat(filePath);
  const fileContent = await fsPromises.readFile(filePath, 'utf-8');

  data.push({
    slug: getSlug(htmlFilename),
    filename: htmlFilename,
    title: getTitle(htmlFilename),
    brief: getBrief(fileContent, 3),
    tags: postTags,
    created: stats.birthtime,
    modified: stats.mtime,
  });
}

async function processPersistentPostsMetadata(postsDirectoryPath: string): Promise<void> {
  const fileContent = await fsPromises.readFile(
    path.join(postsDirectoryPath, 'persistentMetadata.json'),
    'utf8'
  );
  console.log(fileContent);
}

export { generatePostMetadata, writeTransformedPostFile, processPersistentPostsMetadata };
