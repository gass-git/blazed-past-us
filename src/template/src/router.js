import { render } from 'blazed-past-us';
import { postExists } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default async function router(root, postsMetaData) {
  const pathname = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = pathname.split('/')[1];
  const views = { home, post, notFound };

  if (pathname === '/') {
    render('home', root, views, postsMetaData, urlParams.get('tag'));
    return;
  }

  if (postExists(postsMetaData, postSlug)) {
    render('post', root, views, postsMetaData, undefined, postSlug);
    return;
  }

  render('404', root, views, postsMetaData);
}
