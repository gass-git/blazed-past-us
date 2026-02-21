import config from './config.json';
import * as blazed from 'blazed-past-us';
import initRouter from './router';
import pkg from '../package.json';

const root = document.getElementById(config.root_id);
const postsMetaData = await blazed.getPostsMetaData(import.meta.env.BASE_URL, config);

initRouter(root, postsMetaData);

/**
 * ----------------------------
 * Optional UI Enhancements
 * ----------------------------
 * These are demo features included in the starter template.
 * You can safely remove any of them.
 */
blazed.setTitle(document, config.title_id, pkg.name);
blazed.boltRotator(document, config.logo_wrapper_id);

const postsHTML = await blazed.getAllPostsHTML(postsMetaData, import.meta.env.BASE_URL);

export { root, postsMetaData, postsHTML };
