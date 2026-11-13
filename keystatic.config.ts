import { config, fields, singleton } from '@keystatic/core';
const pageSchema = {
  title: fields.text({ label: 'Page title', validation: { isRequired: true } }),
  heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
  description: fields.text({ label: 'Search description', multiline: true }),
  body: fields.markdoc({ label: 'Page content' }),
};
export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'FullPsych prototype' } },
  singletons: {
    home: singleton({ label: 'Home', path: 'prototype/content/home', format: { contentField: 'body' }, entryLayout: 'content', previewUrl: '/', schema: pageSchema }),
    about: singleton({ label: 'About', path: 'prototype/content/about', format: { contentField: 'body' }, entryLayout: 'content', previewUrl: '/about/', schema: pageSchema }),
    design: singleton({
      label: 'Design settings',
      path: 'prototype/settings/design',
      format: { data: 'json' },
      schema: {
        accent: fields.select({ label: 'Accent color', options: [{label:'FullPsych blue',value:'blue'},{label:'Calm teal',value:'teal'},{label:'Warm plum',value:'plum'}], defaultValue: 'blue' }),
        width: fields.select({ label: 'Reading width', options: [{label:'Comfortable',value:'comfortable'},{label:'Wide',value:'wide'}], defaultValue: 'comfortable' }),
      },
    }),
  },
});
