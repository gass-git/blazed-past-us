import { postExists } from './utils.js';

async function inject(
  view: 'home' | 'post' | '404',
  root: HTMLElement,
  home: any,
  post: any,
  notFound: any,
  postsMetaData: any[],
  postId?: string
): Promise<void> {
  if (view === 'home') {
    root.innerHTML = home();
  } else if (view === 'post' && postId && postExists(postsMetaData, postId)) {
    post(postId).then((html: string) => (root.innerHTML = html));
  } else {
    root.innerHTML = notFound();
  }
}

export { inject };
