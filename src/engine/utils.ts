import chalk from 'chalk';
import { PostData } from '../types';
import { getBrief, getTags, getTitle } from './getters.js';
import fsPromises from 'node:fs/promises';

function postExists(postsMetaData: any[], id: string): boolean {
  return postsMetaData.some((post) => post.id === id);
}

function beautifyDate(d: Date | undefined): undefined | string {
  if (!d) return;
  const date = new Date(d);

  return date.toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
}

function showCosmiscSpeed(el: HTMLElement): void {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((en) => {
      if (en.name === 'first-contentful-paint') {
        el.innerHTML = `<span>${en.startTime} ms</span>`;
      }
    });
  }).observe({ type: 'paint', buffered: true });
}

async function writeTransformedPostFile(
  outputPath: string,
  postHtmlContent: string,
  filename: string
): Promise<void> {
  await fsPromises
    .writeFile(outputPath, postHtmlContent, 'utf-8')
    .then(() => console.log(chalk.green(`✔ ${filename} built`)))
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
    id: i.toString(),
    filename: htmlFilename,
    title: getTitle(htmlFilename),
    brief: getBrief(fileContent),
    tags: getTags(fileContent),
    created: stats.birthtime,
    modified: stats.mtime,
  });
}

export {
  postExists,
  beautifyDate,
  showCosmiscSpeed,
  generatePostMetadata,
  writeTransformedPostFile,
};
