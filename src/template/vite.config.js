import { defineConfig } from 'vite';
import config from './src/config.json';

export default defineConfig({
  base: config.base_url,
});
