import { postsMetaData } from '../main';
import { beautifyDate } from 'blazed-past-us';

export default function home() {
  const postsHtmlArray = postsMetaData.map(
    (post) => `
      <a href="${post.id}">
        <div class="post-card">
          <div class="title capitalize-first">${post.title}</div>
          <div class="date">${beautifyDate(post.created)}</div>
          <p class="trim">${post.brief}</p>
        </div>
      </a>
    `
  );

  return postsHtmlArray.join('');
}
