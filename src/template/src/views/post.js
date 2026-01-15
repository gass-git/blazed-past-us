import { getPostData, getPostHtml } from 'blazed-past-us';
import { beautifyDate } from 'blazed-past-us';
import { postsMetaData } from '../main';
import { root } from '../main';

export default async function post(id) {
  let html = '';

  html += `<div class="post">`;
  html += `<div class="title capitalize-first">${getPostData(postsMetaData, id, 'title')}</div>`;
  html += `<div class="date">${beautifyDate(getPostData(postsMetaData, id, 'created'))}</div>`;
  html += await getPostHtml(postsMetaData, root, id);
  html += `</div>`;

  return html;
}
