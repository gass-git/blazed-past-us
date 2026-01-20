import config from './config.json';
import { getPostsMetaData } from 'blazed-past-us';
import router from './router';
import { showCosmicSpeed } from 'blazed-past-us';

const root = document.getElementById(config.root_id);
const speedElement = document.getElementById(config.speed_element_id);
const postsMetaData = await getPostsMetaData(config);

showCosmicSpeed(speedElement);
router(root, postsMetaData);

export { root, postsMetaData };
