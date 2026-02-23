import { postExists, inject } from './utils.js';
import { Views, PostMetaData } from '../types.js';

function render(
  view: string,
  root: HTMLElement,
  views: Views,
  postsMetaData: PostMetaData[],
  postTagFilter?: string,
  postSlug?: string
): void {
  const r = root;
  const { home, post, notFound } = views;

  switch (view) {
    case 'home':
      inject(r, home(postTagFilter));
      break;

    case 'post':
      if (postSlug && postExists(postsMetaData, postSlug)) {
        post(postSlug).then((html: string) => inject(r, html));
      } else {
        inject(r, notFound());
      }
      break;

    default:
      inject(r, notFound());
  }
}

export { render };
