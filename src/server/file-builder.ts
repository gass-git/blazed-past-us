import chalk from 'chalk';
import { getTitle, getBrief, getSlug } from '../engine/getters.js';
import { PostMetadata, PostsRegistry } from '../types';
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
  data: Array<PostMetadata>,
  filePath: string,
  htmlFilename: string,
  postTags: string[],
  persistentPostsMetadata: PostsRegistry | void
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
  });
}

export { generatePostMetadata, writeTransformedPostFile };
