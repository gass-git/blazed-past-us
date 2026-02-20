import { beautifyDate, getPostData, getPostHtml } from 'blazed-past-us';
import { postsMetaData, root } from '../main';

export default async function post(slug) {
  const title = getPostData(postsMetaData, slug, 'title');
  const date = beautifyDate(getPostData(postsMetaData, slug, 'created'));
  const post = await getPostHtml(postsMetaData, root, import.meta.env.BASE_URL, slug);

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${post}
    </div>
  `;
}
