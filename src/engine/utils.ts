import chalk from 'chalk';
import pkg from '../../package.json' with { type: 'json' };
import { Config, MsgColor, PostMetaData } from '../types';

function postExists(postsMetaData: any[], slug: string): boolean {
  return postsMetaData.some((post) => post.slug === slug);
}

function getPathnameFromLocationHash(locationHash: string) {
  return locationHash.split('/').splice(1).join('/');
}

function beautifyDate(d: Date | undefined): undefined | string {
  if (!d) return;
  const date = new Date(d);

  return date.toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
}

function inject(root: HTMLElement, html: string) {
  root.innerHTML = html;
}

function log(msg: string, color: MsgColor): void {
  let coloredMsg: string;

  switch (color) {
    case 'yellow':
      coloredMsg = chalk.yellow(msg);
      break;

    case 'green':
      coloredMsg = chalk.green(msg);
      break;

    case 'red':
      coloredMsg = chalk.red(msg);
      break;

    default:
      coloredMsg = msg;
  }

  console.log(`${chalk.blue(pkg.name + ' v' + pkg.version)} ${coloredMsg}`);
}

function activateBoltRotator(): void {
  const logoElement = document.querySelector('.logo');

  window.onhashchange = () => {
    if (logoElement) {
      logoElement.classList.add('rotate');
      setTimeout(() => logoElement.classList.remove('rotate'), 400);
    }
  };
}

function setTitleAndSubtitle(
  document: HTMLDocument,
  packageName: string,
  config: Config
): void {
  const titleElement = document.querySelector('.title');
  const subtitleElement = document.querySelector('.subtitle');

  if (titleElement) {
    titleElement.innerHTML = packageName.replaceAll('-', ' ');
  }
  if (subtitleElement) {
    subtitleElement.innerHTML = config.subtitle;
  }
}

function filterByUrlQueryIfPresent(
  postsMetaData: PostMetaData[],
  tags: string[]
): PostMetaData[] {
  return postsMetaData.filter((post) =>
    tags ? tags.some((tag) => post.tags.includes(tag)) : true
  );
}

function getLocationHashSpecifics(window: Window): {
  pathname: string;
  queryString: string;
  urlParams: URLSearchParams;
} {
  const hashRoute = window.location.hash;
  const pathname = getPathnameFromLocationHash(hashRoute);
  const queryString = hashRoute.split('?')[1] || '';
  const urlParams = new URLSearchParams(queryString);

  return { pathname, queryString, urlParams };
}

export {
  postExists,
  beautifyDate,
  inject,
  log,
  activateBoltRotator,
  setTitleAndSubtitle,
  getPathnameFromLocationHash,
  filterByUrlQueryIfPresent,
  getLocationHashSpecifics,
};
