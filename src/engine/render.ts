import { postExists, inject } from './utils.js';
import { Views, PostMetadata } from '../types.js';

function render(
  view: string,
  root: HTMLElement,
  views: Views,
  postsMetadata: PostMetadata[],
  postTagsFilter?: string,
  postSlug?: string
): void {
  const r = root;
  const { home, post, notFound } = views;

  switch (view) {
    case 'home':
      inject(r, home(postTagsFilter?.split(',')));
      break;

    case 'post':
      if (postSlug && postExists(postsMetadata, postSlug)) {
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
