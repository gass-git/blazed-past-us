import type { PostMetadata, Config, PostDataType } from '../types';

function getPostData(
  postsMetadata: PostMetadata[],
  slug: string,
  option: PostDataType
): string | string[] | Date | undefined {
  return postsMetadata.find((post: PostMetadata) => post.slug === slug)?.[option];
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

function getColoredTagsHTML(tags: string, config: Config): string {
  return tags
    .replace(/\s/g, '')
    .toLowerCase()
    .split(',')
    .map((key) => {
      const tagColor = config.tags[key]?.color ?? config.tags.default.color;

      return `
        <span class="tag" style="--tag-color: ${tagColor}">
          ${key}
        </span>
      `;
    })
    .join(`<span class="tag-separator">, </span>`);
}

export { getPostData, getTitle, getTags, getBrief, getColoredTagsHTML, getSlug };
