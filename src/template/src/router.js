import { render, postExists, getLocationHashSpecifics } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default function initRouter(root, postsMetadata, postsHTML) {
  routeRenderer(root, postsMetadata, postsHTML);
  window.addEventListener('hashchange', () =>
    routeRenderer(root, postsMetadata, postsHTML)
  );
}

function routeRenderer(root, postsMetadata, postsHTML) {
  const { pathname, queryString, urlParams } = getLocationHashSpecifics(window);
  const views = { home, post, notFound };

  switch (true) {
    case pathname === '' || pathname === 'home' || queryString:
      render('home', root, views, postsMetadata, postsHTML, urlParams.get('tags'));
      break;

    case postExists(postsMetadata, pathname):
      render('post', root, views, postsMetadata, postsHTML, undefined, pathname);
      break;

    default:
      render('404', root, views, postsMetadata);
  }
}
