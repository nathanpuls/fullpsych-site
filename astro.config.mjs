import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
const localPreview = process.argv.includes('dev');
export default defineConfig({
  site: 'https://fullpsych.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 }, plugins: [tinaAdminDevRedirect()], ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] } },
  adapter: localPreview ? node({ mode: 'standalone' }) : undefined,
  integrations: [tina(), {
    name: 'tina-local-preview',
    hooks: { 'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') injectRoute({ pattern: '/tina-island/[name]', entrypoint: './src/tina/island-route.ts', prerender: false });
    } },
  }],
});
