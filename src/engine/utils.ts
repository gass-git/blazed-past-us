import chalk from 'chalk';
import pkg from '../../package.json' with { type: 'json' };
import { MsgColor } from '../types';

function postExists(postsMetaData: any[], id: string): boolean {
  return postsMetaData.some((post) => post.id === id);
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

function showCosmicSpeed(document: HTMLDocument, elementID: string): void {
  const el = document.getElementById(elementID);

  if (el) {
    new PerformanceObserver((list) => {
      list.getEntries().forEach((en) => {
        if (en.name === 'first-contentful-paint') {
          el.innerHTML = `<span>${en.startTime} ms</span>`;
        }
      });
    }).observe({ type: 'paint', buffered: true });
  }
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

function boltRotator(document: HTMLDocument, elementID: string): void {
  const el = document.getElementById(elementID);

  if (el) {
    el.classList.add('rotate');
  }
}

function setTitle(document: HTMLDocument, elementID: string): void {
  const el = document.getElementById(elementID);

  if (el) {
    el.innerText = pkg.name.replaceAll('-', ' ');
  }
}

export { postExists, beautifyDate, showCosmicSpeed, inject, log, boltRotator, setTitle };
