import render from '../../engine/render';
import { postExists } from '../../engine/utils';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default async function router(root, postsMetaData) {
  const pathname = window.location.pathname;

  if (pathname === '/') {
    render('home', root, home, post, notFound, postsMetaData);
  } else if (postExists(postsMetaData, pathname.split('/')[1])) {
    const postId = pathname.split('/')[1];
    render('post', root, home, post, notFound, postsMetaData, postId);
  } else {
    render('404', root, home, post, notFound, postsMetaData);
  }
}
