#!/usr/bin/env node
import { parseMarkdown } from '../server/parse-markdown.js';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import type { PostMetadata, PostsPaths, ParsedPostData } from '../types.js';
import {
  getPostsRegistry,
  handlePostsRegistryUpdate,
  log,
  postNotInRegistry,
} from '../server/server-utils.js';
import {
  generatePostMetadata,
  writeTransformedPostFile,
} from '../server/file-builder.js';
import { getSlug } from '../runtime/getters.js';

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
 * Parses Markdown to HTML, generates metadata,
 * writes transformed files, and emits a JSON index.
 */
async function buildBundle(paths: PostsPaths): Promise<void> {
  const postsFiles = fs.readdirSync(paths.input).filter((f) => f.endsWith('.md'));
  const data: Array<PostMetadata> = new Array();
  const postsRegistry = { data: await getPostsRegistry(paths.input), update: false };

  for (const filename of postsFiles) {
    const filePath = path.join(paths.input, filename);
    const parsedPostData: ParsedPostData = await parseMarkdown(filePath);
    const htmlFilename = filename.replace('.md', '.html');
    const slug = getSlug(htmlFilename);

    await generatePostMetadata(
      data,
      filePath,
      htmlFilename,
      parsedPostData.tags,
      postsRegistry.data
    );

    await fsPromises.mkdir(paths.output, { recursive: true });

    await writeTransformedPostFile(
      path.join(paths.output, htmlFilename),
      parsedPostData.html,
      filename
    );

    if (postNotInRegistry(postsRegistry.data, slug)) {
      postsRegistry.update = true;
      const stats = await fsPromises.stat(filePath);

      postsRegistry.data?.push({
        slug: getSlug(htmlFilename),
        created: stats.birthtime,
      });
    }
  }

  if (postsRegistry.update) {
    handlePostsRegistryUpdate(postsRegistry.data, paths);
  }

  const jsonPosts = JSON.stringify(data);
  fs.writeFileSync(path.join(paths.output, '/data.json'), jsonPosts);
  log('all posts have been parsed into HTML ✅', 'yellow');
}
