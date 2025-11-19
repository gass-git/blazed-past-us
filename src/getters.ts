import type { PostData } from '../types';
import { root, postsMetaData } from './main';
import config from './config.json';

function getPostTitle(id: string): string | undefined {
  return postsMetaData.find((post: PostData) => post.id === id)?.title;
}

async function getPostHtml(postId: string): Promise<String | void> {
  const filename = postsMetaData.find(
    (post: PostData) => post.id === postId
  )?.filename;

  const html = await fetch(`./posts/${filename}`)
    .then((resp) => resp.text())
    .then((htmlString) => (root.innerHTML = htmlString))
    .catch((error) => console.error(error));

  return html;
}

async function getPostsMetaData(): Promise<Array<PostData>> {
  const resp = await fetch(config.posts_data_path);
  const data = await resp.json();

  return data;
}

export { getPostTitle, getPostHtml, getPostsMetaData };
