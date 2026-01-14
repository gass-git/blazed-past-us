import type { PostData } from './types';
import { root, postsMetaData } from '../src/main';
import config from '../template/src/config.json';

function getPostData(
  id: string,
  option: 'title' | 'created' | 'modified' | 'brief'
): string | Date | undefined {
  return postsMetaData.find((post: PostData) => post.id === id)?.[option];
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

export { getPostData, getPostHtml, getPostsMetaData };
