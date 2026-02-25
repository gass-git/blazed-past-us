import { beautifyDate, getPostData } from 'blazed-past-us';
import { postsMetaData, postsHTML } from '../main';

export default async function post(slug) {
  const title = getPostData(postsMetaData, slug, 'title');
  const date = beautifyDate(getPostData(postsMetaData, slug, 'created'));
  const HTMLcontent = postsHTML.find((post) => post.slug === slug).html;

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${HTMLcontent}
    </div>
  `;
}
