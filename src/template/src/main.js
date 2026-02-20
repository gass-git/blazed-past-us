import config from './config.json';
import { getPostsMetaData, showCosmicSpeed, boltRotator, setTitle } from 'blazed-past-us';
import router from './router';
import pkg from '../package.json';

const root = document.getElementById(config.root_id);
const postsMetaData = await getPostsMetaData(import.meta.env.BASE_URL, config);

router(root, postsMetaData);

/**
 * ----------------------------
 * Optional UI Enhancements
 * ----------------------------
 * These are demo features included in the starter template.
 * You can safely remove any of them.
 */
setTitle(document, config.title_id, pkg.name);
boltRotator(document, config.logo_wrapper_id);
showCosmicSpeed(document, config.speed_element_id);

export { root, postsMetaData };
