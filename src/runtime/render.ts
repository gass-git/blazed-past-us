import { postExists, inject } from './utils.js';
import { Views, PostMetadata, PostHTML } from '../types.js';

function render(
  view: string,
  root: HTMLElement,
  views: Views,
  postsMetadata: PostMetadata[],
  postsHTML?: PostHTML[],
  postTagsFilter?: string,
  postSlug?: string
): void {
  const r = root;
  const { home, post, notFound } = views;

  // start from the very top on every render.
  window.scrollTo(0, 0);

  switch (view) {
    case 'home':
      const tags = postTagsFilter?.split(',');

      inject(r, home(tags, postsMetadata));
      break;

    case 'post':
      if (postSlug && postExists(postsMetadata, postSlug)) {
        const htmlContent = postsHTML?.find((p) => p.slug === postSlug)?.html;

        post(postSlug, postsMetadata, htmlContent).then((html: string) =>
          inject(r, html)
        );
      } else {
        inject(r, notFound());
      }
      break;

    default:
      inject(r, notFound());
  }
}

export { render };
