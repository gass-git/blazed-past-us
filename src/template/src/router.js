import { render, postExists, getPathnameFromLocationHash } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default function initRouter(root, postsMetaData) {
  // Render current route immediately.
  routeRenderer(root, postsMetaData);

  window.addEventListener('hashchange', () => routeRenderer(root, postsMetaData));
}

function routeRenderer(root, postsMetaData) {
  const hashRoute = window.location.hash;
  const pathname = getPathnameFromLocationHash(hashRoute);
  const queryString = hashRoute.split('?')[1] || '';
  const urlParams = new URLSearchParams(queryString);
  const views = { home, post, notFound };

  if (pathname === '' || pathname === 'home' || queryString) {
    render('home', root, views, postsMetaData, urlParams.get('tags'));
    return;
  }

  if (postExists(postsMetaData, pathname)) {
    render('post', root, views, postsMetaData, undefined, pathname);
    return;
  }

  render('404', root, views, postsMetaData);
}
