import config from './config.json';
import * as blazed from 'blazed-past-us';
import initRouter from './router';
import pkg from '../package.json';

const root = document.getElementById('root');
const { postsMetadata, postsHTML } = await blazed.fetchResources(config);

initRouter(root, postsMetadata);

/**
 * ----------------------------
 * Optional UI Enhancements
 * ----------------------------
 * These are demo features included in the starter template.
 * You can safely remove any of them.
 */
blazed.setTitleAndSubtitle(pkg.name, config);
blazed.activateBoltRotator();

export { root, postsMetadata, postsHTML };
