// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jjanczyszyn.github.io',
  base: '/rosemary',
  build: {
    assets: 'assets'
  }
});
