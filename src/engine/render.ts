import { postExists } from './utils.js';
import { inject } from './injector.js';

function render(
  view: 'home' | 'post' | '404',
  root: HTMLElement,
  home: any,
  post: any,
  notFound: any,
  postsMetaData: any[],
  postid?: string
) {
  switch (view) {
    case 'home':
      inject('home', root, home, post, notFound, postsMetaData);
      break;

    case 'post':
      postid && postExists(postsMetaData, postid)
        ? inject('post', root, home, post, notFound, postsMetaData, postid)
        : inject('404', root, home, post, notFound, postsMetaData);
      break;

    default:
      inject('404', root, home, post, notFound, postsMetaData);
  }
}

export { render };
