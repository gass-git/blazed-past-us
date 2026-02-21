import { postsMetaData } from '../main';
import { beautifyDate } from 'blazed-past-us';

export default function home(tag) {
  const baseURL = import.meta.env.BASE_URL;

  const postsHtmlArray = postsMetaData
    .filter((post) => (tag ? post.tags.includes(tag) : true))
    .map(
      (post) => `
      <a href="${baseURL}#/${post.slug}">
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
