import chalk from 'chalk';
import { getTitle, getBrief, getTags, getSlug } from '../engine/getters.js';
import { PostMetadata, PersistentPostsMetadata } from '../types';
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
  postTags: string[],
  persistentPostsMetadata: PersistentPostsMetadata | void
): Promise<void> {
  const stats = await fsPromises.stat(filePath);
  const fileContent = await fsPromises.readFile(filePath, 'utf-8');
  const slug = getSlug(htmlFilename);
  const createdDate =
    persistentPostsMetadata?.find((p) => p.slug === slug)?.created || stats.birthtime;

  data.push({
    slug: getSlug(htmlFilename),
    filename: htmlFilename,
    title: getTitle(htmlFilename),
    brief: getBrief(fileContent, 3),
    tags: postTags,
    created: createdDate,
    modified: stats.mtime,
  });
}

async function fetchPersistentPostsMetadata(
  postsDirectoryPath: string
): Promise<void | PersistentPostsMetadata> {
  try {
    const resp = await fsPromises.readFile(
      path.join(postsDirectoryPath, 'persistentMetadata.json'),
      'utf8'
    );
    const data = JSON.parse(resp);
    return data.posts;
  } catch (error) {
    console.error(error);
  }
}

/**
async function processPersistentPostsMetadata(
  postsDirectoryPath: string
): Promise<void> {}
*/

export { generatePostMetadata, writeTransformedPostFile, fetchPersistentPostsMetadata };
