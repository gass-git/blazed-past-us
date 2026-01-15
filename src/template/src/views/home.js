import { postsMetaData } from '../main';
import { beautifyDate } from 'blazed-past-us';

export default function home() {
  let html = '';

  postsMetaData.forEach((post) => {
    html += `
      <a href="${post.id}">
        <div class="post-card">
          <div class="title capitalize-first">${post.title}</div>
          <div class="date">${beautifyDate(post.created)}</div>
          <p class="trim">${post.brief}</p>
        </div>
      </a>
    `;
  });

  return html;
}
