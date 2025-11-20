import { postsMetaData } from '../main';
import { beautifyDate } from '../../engine/utils';

export default function home(): string {
  let html = '';

  postsMetaData.forEach((post) => {
    html += `
      <a href="${post.id}">
        <div class="post-card padding-20">
          <div class="title capitalize-first">${post.title}</div>
          <p>${beautifyDate(post.created)}</p>
          <p>${post.brief}</p>
        </div>
      </a>
    `;
  });

  return html;
}
