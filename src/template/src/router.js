import { render, postExists, getLocationHashSpecifics } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default function initRouter(root, postsMetadata) {
  routeRenderer(root, postsMetadata);
  window.addEventListener('hashchange', () => routeRenderer(root, postsMetadata));
}

function routeRenderer(root, postsMetadata) {
  const { pathname, queryString, urlParams } = getLocationHashSpecifics(window);
  const views = { home, post, notFound };

  switch (true) {
    case pathname === '' || pathname === 'home' || queryString:
      render('home', root, views, postsMetadata, urlParams.get('tags'));
      break;

    case postExists(postsMetadata, pathname):
      render('post', root, views, postsMetadata, undefined, pathname);
      break;

    default:
      render('404', root, views, postsMetadata);
  }
}
