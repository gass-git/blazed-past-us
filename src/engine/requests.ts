import { Config, PostMetadata, PostHTML, PersistentPostsMetadata } from '../types';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

async function fetchResources(config: Config): Promise<void | {
  postsMetadata: PostMetadata[];
  postsHTML: PostHTML[];
}> {
  try {
    const postsMetadata = await fetchPostsMetaData(config);
    const postsHTML = await fetchAllPostsHTML(config.base_url, postsMetadata);

    return { postsMetadata, postsHTML };
  } catch (error) {
    console.log(`Failed to fetch resources.`);
    console.error(error);
  }
}

async function fetchAllPostsHTML(
  baseURL: string,
  postsMetadata: PostMetadata[]
): Promise<PostHTML[]> {
  const allPostsFilename = postsMetadata.map((el) => ({
    slug: el.slug,
    filename: el.filename,
  }));
  const allPostsHTML = new Array();

  for (const post of allPostsFilename) {
    const HTML = await fetch(`${baseURL}posts/${post.filename}`)
      .then((resp) => resp.text())
      .catch((error) => console.error(error));

    allPostsHTML.push({ slug: post.slug, html: HTML });
  }

  return allPostsHTML;
}

async function fetchPostsMetaData(config: Config): Promise<PostMetadata[]> {
  // If config.base_url does not end with "/" append it.
  const baseUrl = config.base_url.endsWith('/') ? config.base_url : config.base_url + '/';

  const postsRelativeDataPath = 'posts/data.json';
  const postsPath = [baseUrl, postsRelativeDataPath].join('');

  try {
    const resp = await fetch(postsPath);

    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch posts metadata:', error);
    throw error;
  }
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
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchResources, fetchPersistentPostsMetadata };
