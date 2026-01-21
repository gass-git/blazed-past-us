import { beautifyDate, getPostData, getPostHtml } from 'blazed-past-us';
import { postsMetaData, root } from '../main';

export default async function post(id) {
  const title = getPostData(postsMetaData, id, 'title');
  const date = beautifyDate(getPostData(postsMetaData, id, 'created'));
  const post = await getPostHtml(postsMetaData, root, id);

  return `
    <div class="post">
      <div class="title capitalize-first">${title}</div>
      <div class="date">${date}</div>
      ${post}
    </div>
  `;
}
