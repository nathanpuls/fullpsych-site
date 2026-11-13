import { defineConfig } from 'tinacms';
export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'astro-tina-prototype',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'assets', publicFolder: 'public' } },
  schema: {
    collections: [{
      name: 'page',
      label: 'Pages',
      path: 'content/pages',
      format: 'mdx',
      ui: { router: ({ document }) => document._sys.filename === 'home' ? '/' : '/' + document._sys.filename + '/' },
      fields: [
        { type: 'string', name: 'title', label: 'Page name', isTitle: true, required: true },
        { type: 'string', name: 'heading', label: 'Heading (optional)' },
        { type: 'string', name: 'description', label: 'Search description' },
        { type: 'image', name: 'image', label: 'Image (optional)' },
        { type: 'rich-text', name: 'body', label: 'Page content', isBody: true },
      ],
    }, {
      name: 'settings',
      label: 'Site Settings',
      path: 'content/settings',
      format: 'json',
      ui: { global: true, allowedActions: { create: false, delete: false } },
      fields: [{
        type: 'object', name: 'navigation', label: 'Navigation', list: true,
        description: 'Add, remove, or drag links to change their order.',
        ui: { itemProps: (item) => ({ label: item.label || 'New link' }) },
        fields: [
          { type: 'string', name: 'label', label: 'Link text', required: true },
          { type: 'string', name: 'url', label: 'Link URL', required: true, description: 'For example /about/ or https://example.com' },
        ],
      }],
    }],
  },
});

