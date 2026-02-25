import { beautifyDate, getPostData } from 'blazed-past-us';
import { postsMetadata, postsHTML } from '../main';

export default async function post(slug) {
  const title = getPostData(postsMetadata, slug, 'title');
  const date = beautifyDate(getPostData(postsMetadata, slug, 'created'));
  const HTMLcontent = postsHTML.find((post) => post.slug === slug).html;

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${HTMLcontent}
    </div>
  `;
}
