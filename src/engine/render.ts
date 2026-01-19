import { postExists, inject } from './utils.js';

function render(
  view: 'home' | 'post' | '404',
  root: HTMLElement,
  views: {
    home: () => string;
    post: (id: string) => Promise<string>;
    notFound: () => string;
  },
  postsMetaData: any[],
  postId?: string
): void {
  const r = root;
  const { home, post, notFound } = { ...views };

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
