import { postExists } from './utils';
import inject from './injector';

export default function render(val: 'home' | 'post' | '404', postid?: string) {
  switch (val) {
    case 'home':
      inject('home');
      break;

    case 'post':
      postid && postExists(postid) ? inject('post', postid) : inject('404');
      break;

    default:
      inject('404');
  }
}
