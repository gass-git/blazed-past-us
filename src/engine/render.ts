import { postExists, inject } from './utils.js';

function render(
  view: 'home' | 'post' | '404',
  root: HTMLElement,
  home: any,
  post: any,
  notFound: any,
  postsMetaData: any[],
  postId?: string
): void {
  const r = root;

  switch (view) {
    case 'home':
      inject(r, home());
      break;

    case 'post':
      postId && postExists(postsMetaData, postId)
        ? post(postId).then((html: string) => inject(r, html))
        : inject(r, notFound());
      break;

    default:
      inject(r, notFound());
  }
}

export { render };
