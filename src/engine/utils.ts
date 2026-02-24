import chalk from 'chalk';
import pkg from '../../package.json' with { type: 'json' };
import { MsgColor, PostMetaData } from '../types';

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

function boltRotator(document: HTMLDocument): void {
  const el = document.querySelector('.logo');

  if (el) {
    el.classList.add('rotate');
  }
}

function setTitle(document: HTMLDocument, elementID: string, packageName: string): void {
  const el = document.getElementById(elementID);

  if (el) {
    el.innerText = packageName.replaceAll('-', ' ');
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

export {
  postExists,
  beautifyDate,
  inject,
  log,
  boltRotator,
  setTitle,
  getPathnameFromLocationHash,
  filterByUrlQueryIfPresent,
};
