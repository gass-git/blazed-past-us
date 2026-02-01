import type { PostData, Config, PostDataType, ConsumerConfig } from '../types';

function getPostData(
  postsMetaData: PostData[],
  id: string,
  option: PostDataType
): string | Date | undefined {
  return postsMetaData.find((post: PostData) => post.id === id)?.[option];
}

async function getPostHtml(
  postsMetaData: PostData[],
  root: HTMLElement,
  postId: string
): Promise<String | void> {
  const filename = postsMetaData.find((post: PostData) => post.id === postId)?.filename;

  const html = await fetch(`./posts/${filename}`)
    .then((resp) => resp.text())
    .then((htmlString) => (root.innerHTML = htmlString))
    .catch((error) => console.error(error));

  return html;
}

async function getPostsMetaData(config: Config): Promise<PostData[]> {
  const resp = await fetch(config.posts_data_path);
  const data = await resp.json();

  return data;
}

function getTitle(htmlFilename: string): string {
  return htmlFilename.replace('.html', '').replaceAll('-', ' ');
}

function getBrief(fileContent: string, lines: number): string {
  const A =
    fileContent
      .split('\n')
      .splice(1)
      .filter((str) => !str.includes('tags') && str.length > 10) || '';

  let brief = '';

  for (let l = 0; l < lines; l++) {
    brief += A[l];
  }

  return brief.replace(/\r/g, ' ');
}

function getTags(fileContent: string): string[] {
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

function getColoredTagsHTML(tags: string[], consumerConfig: ConsumerConfig): string {
  return tags[0]
    .replace(/\s/g, '')
    .toLowerCase()
    .split(',')
    .map((key) => {
      const tagColor = consumerConfig.tags[key]?.color ?? consumerConfig.tags.default.color;

      return `
        <span class="tag" style="--tag-color: ${tagColor}">
          ${key}
        </span>
      `;
    })
    .join(`<span class="tag-separator">, </span>`);
}

export {
  getPostData,
  getPostHtml,
  getPostsMetaData,
  getTitle,
  getTags,
  getBrief,
  getColoredTagsHTML,
};
