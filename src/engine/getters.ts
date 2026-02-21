import type { PostData, Config, PostDataType, ConsumerConfig } from '../types';

function getPostData(
  postsMetaData: PostData[],
  slug: string,
  option: PostDataType
): string | Date | undefined {
  return postsMetaData.find((post: PostData) => post.slug === slug)?.[option];
}

async function getAllPostsHTML(
  postsMetaData: PostData[],
  baseURL: string
): Promise<{ slug: string; html: string | void }[]> {
  const allPostsFilename = postsMetaData.map((el) => ({ slug: el.slug, filename: el.filename }));
  const allPostsHTML = [];

  for (const post of allPostsFilename) {
    const HTML = await fetch(`${baseURL}posts/${post.filename}`)
      .then((resp) => resp.text())
      .catch((error) => console.error(error));

    allPostsHTML.push({ slug: post.slug, html: HTML });
  }

  return allPostsHTML;
}

async function getPostsMetaData(baseURL: string, config: Config): Promise<PostData[]> {
  const postsRelativeDataPath = config.posts_data_path;
  const postsPath = [baseURL, postsRelativeDataPath].join('');

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

function getSlug(htmlFilename: string): string {
  return htmlFilename.replace('.html', '');
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

function getColoredTagsHTML(tags: string, consumerConfig: ConsumerConfig): string {
  return tags
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
  getAllPostsHTML,
  getPostsMetaData,
  getTitle,
  getTags,
  getBrief,
  getColoredTagsHTML,
  getSlug,
};
