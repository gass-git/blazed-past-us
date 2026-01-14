import { root } from '../src/main';
import { postExists } from './utils';
import home from '../src/views/home';
import post from '../src/views/post';
import notFound from '../src/views/notFound';

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
