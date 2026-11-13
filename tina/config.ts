import { defineConfig } from 'tinacms';
const contentFields = [
  { type: 'string', name: 'title', label: 'Page name', isTitle: true, required: true },
  { type: 'string', name: 'slug', label: 'URL slug', required: true, description: 'Use home for the homepage. Keep existing slugs to preserve links.', ui: { validate: (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '') ? undefined : 'Use lowercase letters, numbers, and hyphens.' } },
  { type: 'string', name: 'description', label: 'Search description', ui: { component: 'textarea' } },
  { type: 'boolean', name: 'published', label: 'Include when publishing', ui: { defaultValue: true } },
  { type: 'image', name: 'image', label: 'Image (optional)' },
  { type: 'rich-text', name: 'body', label: 'Content', isBody: true },
] as const;
export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'assets', publicFolder: 'public' } },
  schema: { collections: [
    {
      name: 'page', label: 'Pages', path: 'content/pages', format: 'mdx',
      ui: { router: ({ document }) => document._values.slug === 'home' ? '/' : '/' + (document._values.slug || document._sys.filename) + '/' },
      fields: [
        ...contentFields,
        { type: 'string', name: 'template', label: 'Page layout', options: ['home', 'profile', 'approach', 'articles-index', 'contact', 'standard'] },
      ],
    },
    {
      name: 'article', label: 'Articles', path: 'content/articles', format: 'mdx',
      ui: { router: ({ document }) => '/articles/' + (document._values.slug || document._sys.filename) + '/' },
      fields: [...contentFields, { type: 'datetime', name: 'date', label: 'Date' }, { type: 'string', name: 'imageAlt', label: 'Image description' }],
    },
    {
      name: 'settings', label: 'Site Settings', path: 'content/settings', format: 'json',
      ui: { global: true, allowedActions: { create: false, delete: false } },
      fields: [
        { type: 'string', name: 'name', label: 'Site name', required: true },
        { type: 'string', name: 'practitioner', label: 'Practitioner' },
        { type: 'string', name: 'tagline', label: 'Tagline' },
        { type: 'string', name: 'description', label: 'Default search description' },
        { type: 'string', name: 'url', label: 'Site URL', required: true },
        { type: 'image', name: 'logo', label: 'Logo' },
        { type: 'image', name: 'portrait', label: 'Default portrait' },
        { type: 'string', name: 'web3formsKey', label: 'Web3Forms public access key' },
        { type: 'object', name: 'navigation', label: 'Navigation', list: true,
          ui: { itemProps: (item) => ({ label: item.label || 'New link' }) },
          fields: [
            { type: 'string', name: 'label', label: 'Link text', required: true },
            { type: 'string', name: 'url', label: 'Link URL', required: true },
          ],
        },
      ],
    },
  ] },
});
