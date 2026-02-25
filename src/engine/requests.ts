import { Config, PostMetadata, PostHTML } from '../types';

export async function fetchResources(config: Config): Promise<void | {
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
  const postsRelativeDataPath = config.posts_data_path;
  const postsPath = [config.base_url, postsRelativeDataPath].join('');

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
