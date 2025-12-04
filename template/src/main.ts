import config from './config.json';
import { getPostsMetaData } from '../engine/getters';
import router from './router';
import { showCosmiscSpeed } from '../engine/utils';

const root = document.getElementById(config.root_id);
const speedElement = document.getElementById(config.speed_element_id);
const postsMetaData = await getPostsMetaData();

showCosmiscSpeed(speedElement as HTMLElement);
router();

export { root, postsMetaData };
