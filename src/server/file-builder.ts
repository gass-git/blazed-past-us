import chalk from 'chalk';
import { getTitle, getBrief, getTags, getSlug } from '../engine/getters.js';
import { PostData } from '../types';
import fsPromises from 'node:fs/promises';

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
  data: Array<PostData>,
  i: number,
  filePath: string,
  htmlFilename: string
): Promise<void> {
  const stats = await fsPromises.stat(filePath);
  const fileContent = await fsPromises.readFile(filePath, 'utf-8');

  data.push({
    slug: getSlug(htmlFilename),
    filename: htmlFilename,
    title: getTitle(htmlFilename),
    brief: getBrief(fileContent, 3),
    tags: getTags(fileContent),
    created: stats.birthtime,
    modified: stats.mtime,
  });
}

export { generatePostMetadata, writeTransformedPostFile };
