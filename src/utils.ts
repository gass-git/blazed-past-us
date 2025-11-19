import { root } from './main';
import { postsMetaData } from './main';
import { getPostTitle, getPostHtml } from './getters';

function postExists(id: string): boolean {
  return postsMetaData.some((post) => post.id === id);
}

async function inject(
  val: 'home' | 'post' | '404',
  postId?: string
): Promise<void> {
  if (val === 'home') {
    root.innerHTML = `<h1>Home</h1>`;

    postsMetaData.forEach((post) => {
      root.innerHTML += `<h2>${post.title}</h2>`;
      root.innerHTML += `<h3>${post.brief}</h3>`;
    });
  } else if (val === 'post' && postId && postExists(postId)) {
    const postHTML = await getPostHtml(postId);

    root.innerHTML = `<h1>${getPostTitle(postId)}</h1>`;
    root.innerHTML += postHTML;
  } else {
    root.innerHTML = `<h1>404 not found</h1>`;
  }
}

export { postExists, inject };
