import { getPostTitle, getPostHtml } from '../getters';

export default async function post(id: string): Promise<string> {
  let html = `<h1>${getPostTitle(id)}</h1>`;
  html += await getPostHtml(id);

  return html;
}
