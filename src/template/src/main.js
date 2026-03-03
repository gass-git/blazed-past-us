import config from './config.json';
import * as blazed from 'blazed-past-us';
import initRouter from './router';
import pkg from '../package.json';
import layout from './layout';

const { postsMetadata, postsHTML } = await blazed.fetchResources(config);

blazed.inject(document.body, layout());
initRouter(document.getElementById('root'), postsMetadata, postsHTML);

/**
 * ----------------------------
 * Optional UI Enhancements
 * ----------------------------
 * These are demo features included in the starter template.
 * You can safely remove any of them.
 */
blazed.setTitleAndSubtitle(pkg.name, config);
blazed.activateBoltRotator();
