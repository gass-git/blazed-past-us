import { render, postExists, getLocationHashSpecifics } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default function initRouter(root, postsMetaData) {
  routeRenderer(root, postsMetaData);
  window.addEventListener('hashchange', () => routeRenderer(root, postsMetaData));
}

function routeRenderer(root, postsMetaData) {
  const { pathname, queryString, urlParams } = getLocationHashSpecifics(window);
  const views = { home, post, notFound };

  switch (true) {
    case pathname === '' || pathname === 'home' || queryString:
      render('home', root, views, postsMetaData, urlParams.get('tags'));
      break;

    case postExists(postsMetaData, pathname):
      render('post', root, views, postsMetaData, undefined, pathname);
      break;

    default:
      render('404', root, views, postsMetaData);
  }
}
