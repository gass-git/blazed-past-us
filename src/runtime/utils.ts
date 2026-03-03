import { Config, PostMetadata } from '../types';

function postExists(postsMetadata: any[], slug: string): boolean {
  return postsMetadata.some((post) => post.slug === slug);
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

function activateBoltRotator(): void {
  const logoElement = document.querySelector('.logo');

  window.onhashchange = () => {
    if (logoElement) {
      logoElement.classList.add('rotate');
      setTimeout(() => logoElement.classList.remove('rotate'), 400);
    }
  };
}

function setTitleAndSubtitle(packageName: string, config: Config): void {
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
  postsMetadata: PostMetadata[],
  tags: string[]
): PostMetadata[] {
  return postsMetadata.filter((post) =>
    tags ? tags.some((tag) => post.tags.includes(tag)) : true
  );
}

function appendPageLoader(): void {
  const htmlElement = document.createElement('div');

  htmlElement.id = 'loader';
  htmlElement.innerHTML = '<div class="spinner"></div>';

  document.body.appendChild(htmlElement);
}

function removePageLoader(): void {
  document.getElementById('loader')?.remove();
}

export {
  postExists,
  beautifyDate,
  inject,
  activateBoltRotator,
  setTitleAndSubtitle,
  filterByUrlQueryIfPresent,
  appendPageLoader,
  removePageLoader,
};
