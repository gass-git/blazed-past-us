#!/usr/bin/env node
import { parseMarkdown } from '../engine/parse-markdown.js';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import type { PostData, PostsPaths } from '../types.js';
import {
  generatePostMetadata,
  writeTransformedPostFile,
} from '../engine/utils.js';

/**
 * CLI entry point.
 * Resolves project paths and builds bundle.
 */
(function main(): void {
  const root = process.cwd();
  const paths = initPaths(root);

  buildBundle(paths);
})();

/**
 * Initializes the input and output paths for posts.
 *
 * @param root Project root (where CLI was invoked).
 * @returns Paths used to read source posts and write parsed output.
 */
function initPaths(root: string): PostsPaths {
  return {
    input: path.resolve(root, 'src/posts'),
    output: path.resolve(root, 'dist/posts'),
  };
}

/**
 * Processes all post files:
 *
 * parses Markdown to HTML, generates metadata,
 * writes transformed files, and emits a JSON index.
 */
async function buildBundle(paths: PostsPaths): Promise<void> {
  const postsFiles = fs.readdirSync(paths.input);
  const data: Array<PostData> = [];

  for (const [i, filename] of postsFiles.entries()) {
    const filePath = path.join(paths.input, filename);
    const postHtmlContent = await parseMarkdown(filePath);
    const htmlFilename = filename.replace('.md', '.html');

    await generatePostMetadata(data, i, filePath, htmlFilename);
    await fsPromises.mkdir(paths.output, { recursive: true });

    writeTransformedPostFile(
      path.join(paths.output, htmlFilename),
      postHtmlContent,
      filename
    );
  }

  const jsonPosts = JSON.stringify(data);
  fs.writeFileSync(path.join(paths.output, '/data.json'), jsonPosts);

  console.log(chalk.yellow('All posts have been parsed into HTML ✅'));
}
