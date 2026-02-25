import { beautifyDate, getPostData } from 'blazed-past-us';

export default async function post(slug, postsMetadata, htmlContent) {
  const title = getPostData(postsMetadata, slug, 'title');
  const date = beautifyDate(getPostData(postsMetadata, slug, 'created'));

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${htmlContent}
    </div>
  `;
}
