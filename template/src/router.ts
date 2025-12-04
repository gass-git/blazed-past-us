import render from '../engine/render';
import { postExists } from '../engine/utils';

export default async function router(): Promise<void> {
  const pathname = window.location.pathname;

  if (pathname === '/') {
    render('home');
  } else if (postExists(pathname.split('/')[1])) {
    const postId = pathname.split('/')[1];
    render('post', postId);
  } else {
    render('404');
  }
}
