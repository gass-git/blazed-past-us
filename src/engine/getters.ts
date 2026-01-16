import type { PostData } from '../types';

function getPostData(
  postsMetaData: any[],
  id: string,
  option: 'title' | 'created' | 'modified' | 'brief'
): string | Date | undefined {
  return postsMetaData.find((post: PostData) => post.id === id)?.[option];
}

async function getPostHtml(
  postsMetaData: any[],
  root: HTMLElement,
  postId: string
): Promise<String | void> {
  const filename = postsMetaData.find(
    (post: PostData) => post.id === postId
  )?.filename;

  const html = await fetch(`./posts/${filename}`)
    .then((resp) => resp.text())
    .then((htmlString) => (root.innerHTML = htmlString))
    .catch((error) => console.error(error));

  return html;
}

async function getPostsMetaData(config: any): Promise<Array<PostData>> {
  const resp = await fetch(config.posts_data_path);
  const data = await resp.json();

  return data;
}

function getTitle(htmlFilename: string): string {
  return htmlFilename.replace('.html', '').replaceAll('-', ' ');
}

function getBrief(fileContent: string): string {
  return (
    fileContent
      .split('\n')
      .find((str) => !str.includes('tags') && str.length > 10) || ''
  );
}

function getTags(fileContent: string) {
  return (
    fileContent
      .split('\n')
      ?.find((str) => str.includes('**tags:**'))
      ?.split('**tags:**')
      ?.slice(1)[0]
      ?.split(',')
      .map((str) => str.trim()) || []
  );
}

export {
  getPostData,
  getPostHtml,
  getPostsMetaData,
  getTitle,
  getTags,
  getBrief,
};
