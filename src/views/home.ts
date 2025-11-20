import { postsMetaData } from '../main';

export default function home(): string {
  let html = '';

  html += `<h1>gass-git</h1>`;

  postsMetaData.forEach((post) => {
    html += `
      <a href="${post.id}">
        <h2>${post.title}</h2>
      </a>
        <h3>${post.brief}</h3>
    `;
  });

  return html;
}
