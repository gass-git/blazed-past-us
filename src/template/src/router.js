import { render } from 'blazed-past-us';
import { postExists } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default function initRouter(root, postsMetaData) {
  // Render current route immediately.
  handleRoute(root, postsMetaData);

  window.addEventListener('hashchange', () => handleRoute(root, postsMetaData));
}

/**
 * GitHub Pages is a static file server. It does not understand client-side routing.
 * Everything after # stays client-side.
 *
 * This is the reason why we use hash routing.
 */
async function handleRoute(root, postsMetaData) {
  const hashRoute = window.location.hash;
  const pathname = getPathname(hashRoute);
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

// Removes "#/" from the location hash.
function getPathname(locationHash) {
  return locationHash.split('/').splice(1).join('/');
}
