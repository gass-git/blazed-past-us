import { getPostTitle, getPostHtml } from '../../engine/getters';

export default async function post(id: string): Promise<string> {
  let html = `<h1 class="capitalize-first">${getPostTitle(id)}</h1>`;
  html += await getPostHtml(id);

  return html;
}
