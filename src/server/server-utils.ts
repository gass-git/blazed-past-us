import path from 'node:path';
import fsPromises from 'node:fs/promises';
import { MsgColor, PostMetadata, PostsPaths, PostsRegistry } from '../types';
import fs from 'node:fs';
import chalk from 'chalk';
import pkg from '../../package.json' with { type: 'json' };
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';

function postNotInRegistry(registry: PostsRegistry | [] | void, slug: string): boolean {
  return !registry?.some((p) => p.slug === slug);
}

function handlePostsRegistryUpdate(
  postsRegistry: PostsRegistry | void,
  paths: PostsPaths
): void {
  if (postsRegistry) {
    const postsRegistryJSON = JSON.stringify(postsRegistry);
    fs.writeFileSync(path.join(paths.input, 'registry.json'), postsRegistryJSON);
    log('posts registry updated 💾', 'yellow');
  }
}

async function getPostsRegistry(
  postsDirectoryPath: string
): Promise<void | PostsRegistry> {
  try {
    const resp = await fsPromises.readFile(
      path.join(postsDirectoryPath, 'registry.json'),
      'utf8'
    );

    return JSON.parse(resp);
  } catch (error) {
    console.error(error);
  }
}

function copyRecursive(src: string, destination: string): void {
  const srcPathExists = fs.existsSync(src);

  if (!srcPathExists) {
    return;
  }

  if (fs.statSync(src).isDirectory()) {
    /**
     * Make a folder at the destination path with the same name
     * as the one in src.
     */
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    /**
     * Copy the content of the src folder to the destination only if
     * it already does not exist. (to avoid unwanted overrites)
     */
    fs.readdirSync(src).forEach((item) => {
      const itemSrcPath = path.join(src, item);
      const itemDestinationPath = path.join(destination, item);

      if (
        fs.existsSync(itemDestinationPath) &&
        fs.statSync(itemDestinationPath).isFile()
      ) {
        return;
      }

      copyRecursive(itemSrcPath, itemDestinationPath);
    });
  } else {
    fs.copyFileSync(src, destination);
  }
}

function log(msg: string, color: MsgColor): void {
  let coloredMsg: string;

  switch (color) {
    case 'yellow':
      coloredMsg = chalk.yellow(msg);
      break;

    case 'green':
      coloredMsg = chalk.green(msg);
      break;

    case 'red':
      coloredMsg = chalk.red(msg);
      break;

    default:
      coloredMsg = msg;
  }

  console.log(`${chalk.blue(pkg.name + ' v' + pkg.version)} ${coloredMsg}`);
}

function sortPostsByNewest(postsMetadata: PostMetadata[]): PostMetadata[] {
  return postsMetadata.sort((a, b) => b.created.localeCompare(a.created));
}

export {
  postNotInRegistry,
  handlePostsRegistryUpdate,
  getPostsRegistry,
  copyRecursive,
  log,
  sortPostsByNewest,
};
