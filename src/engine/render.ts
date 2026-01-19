import { postExists } from './utils.js';

function render(
  view: 'home' | 'post' | '404',
  root: HTMLElement,
  home: any,
  post: any,
  notFound: any,
  postsMetaData: any[],
  postId?: string
): void {
  switch (view) {
    case 'home':
      root.innerHTML = home();
      break;

    case 'post':
      postId && postExists(postsMetaData, postId)
        ? post(postId).then((html: string) => (root.innerHTML = html))
        : (root.innerHTML = notFound());
      break;

    default:
      root.innerHTML = notFound();
  }
}

export { render };
