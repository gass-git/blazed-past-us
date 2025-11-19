import { root } from './main';
import { postExists } from './utils';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default async function inject(
  view: 'home' | 'post' | '404',
  postId?: string
): Promise<void> {
  if (view === 'home') {
    root.innerHTML = home();
  } else if (view === 'post' && postId && postExists(postId)) {
    post(postId).then((html) => (root.innerHTML = html));
  } else {
    root.innerHTML = notFound();
  }
}
