import { beautifyDate, getPostData, getPostHtml } from 'blazed-past-us';
import { postsMetaData, postsHTML } from '../main';

export default async function post(slug) {
  const title = getPostData(postsMetaData, slug, 'title');
  const date = beautifyDate(getPostData(postsMetaData, slug, 'created'));

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${postsHTML.find((post) => post.slug === slug).html}
    </div>
  `;
}
