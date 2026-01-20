import { postExists, inject } from './utils.js';
import { View, Views, PostData } from '../types.js';

function render(
  view: View,
  root: HTMLElement,
  views: Views,
  postsMetaData: PostData[],
  postId?: string
): void {
  const r = root;
  const { home, post, notFound } = views;

  switch (view) {
    case 'home':
      inject(r, home());
      break;

    case 'post':
      if (postId && postExists(postsMetaData, postId)) {
        post(postId).then((html: string) => inject(r, html));
      } else {
        inject(r, notFound());
      }
      break;

    default:
      inject(r, notFound());
  }
}

export { render };
