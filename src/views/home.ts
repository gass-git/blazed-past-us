import { postsMetaData } from '../main';

export default function home(): string {
  let html = '';

  html += `
    <div class="padding-20">
      <h1>gass-git</h1>
    </div>
  `;

  postsMetaData.forEach((post) => {
    html += `
      <a href="${post.id}">
        <div class="post-card">
          <h2>${post.title}</h2>
          <h3>${post.brief}</h3>
        </div>
      </a>
    `;
  });

  return html;
}
