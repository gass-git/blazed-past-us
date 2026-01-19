import { render } from 'blazed-past-us';
import { postExists } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default async function router(root, postsMetaData) {
  const pathname = window.location.pathname;
  const postId = pathname.split('/')[1];
  const views = { home, post, notFound };

  if (pathname === '/') {
    render('home', root, views, postsMetaData);
    return;
  }

  if (postExists(postsMetaData, postId)) {
    render('post', root, views, postsMetaData, postId);
    return;
  }

  render('404', root, views, postsMetaData);
}
