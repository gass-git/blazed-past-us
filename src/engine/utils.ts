import { postsMetaData } from '../src/main';

function postExists(id: string): boolean {
  return postsMetaData.some((post) => post.id === id);
}

function beautifyDate(d: Date | undefined) {
  if (!d) return;
  const date = new Date(d);

  return date.toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
}

function showCosmiscSpeed(el: HTMLElement): void {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((en) => {
      if (en.name === 'first-contentful-paint') {
        el.innerHTML = `<span>${en.startTime} ms</span>`;
      }
    });
  }).observe({ type: 'paint', buffered: true });
}

export { postExists, beautifyDate, showCosmiscSpeed };
