import config from './config.json';
import { getPostsMetaData } from './getters';
import router from './router';

export const root = document.getElementById(config.root_id) as HTMLElement;
export const postsMetaData = await getPostsMetaData();

router();
