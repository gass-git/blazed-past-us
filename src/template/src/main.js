import config from './config.json';
import * as blazed from 'blazed-past-us';
import initRouter from './router';
import pkg from '../package.json';

const root = document.getElementById('root');
const baseUrl = import.meta.env.BASE_URL;
const postsMetaData = await blazed.getPostsMetaData(baseUrl, config);

initRouter(root, postsMetaData);

/**
 * ----------------------------
 * Optional UI Enhancements
 * ----------------------------
 * These are demo features included in the starter template.
 * You can safely remove any of them.
 */
blazed.setTitleAndSubtitle(pkg.name, config);
blazed.activateBoltRotator();

const postsHTML = await blazed.getAllPostsHTML(postsMetaData, baseUrl);

export { root, postsMetaData, postsHTML };
