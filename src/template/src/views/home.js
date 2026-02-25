import { beautifyDate, filterByUrlQueryIfPresent } from 'blazed-past-us';

export default function home(tags, postsMetadata) {
  const baseURL = import.meta.env.BASE_URL;
  const postsToShow = filterByUrlQueryIfPresent(postsMetadata, tags);

  return postsToShow
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
    )
    .join('');
}
