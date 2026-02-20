import { render } from 'blazed-past-us';
import { postExists } from 'blazed-past-us';
import home from './views/home';
import post from './views/post';
import notFound from './views/notFound';

export default async function router(root, postsMetaData) {
  const pathname = unbasePath(window.location.pathname);
  const urlParams = new URLSearchParams(window.location.search);
  const views = { home, post, notFound };

  if (pathname === '' || pathname === 'home') {
    render('home', root, views, postsMetaData, urlParams.get('tag'));
    return;
  }

  if (postExists(postsMetaData, pathname)) {
    render('post', root, views, postsMetaData, undefined, pathname);
    return;
  }

  render('404', root, views, postsMetaData);
}

// Removes the BASE_URL from the pathname if present.
function unbasePath(pathname) {
  return pathname
    .split('/')
    .filter((name) => !import.meta.env.BASE_URL.split('/').includes(name))
    .join('');
}
