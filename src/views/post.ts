import { getPostData, getPostHtml } from '../../engine/getters';
import { beautifyDate } from '../../engine/utils';

export default async function post(id: string): Promise<string> {
  let html = '';

  html += `<div class="post">`;
  html += `<div class="title capitalize-first">${getPostData(id, 'title')}</div>`;
  html += `<p>${beautifyDate(getPostData(id, 'created') as Date)}</p>`;
  html += await getPostHtml(id);
  html += `</div>`;

  return html;
}
