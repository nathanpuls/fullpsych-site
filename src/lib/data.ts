import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
export const getPage = (slug: string) =>
  requestWithMetadata(client.queries.page({ relativePath: slug + '.mdx' }), { priority: 'primary' });


export const getSettings = () =>
  requestWithMetadata(client.queries.settings({ relativePath: 'site.json' }));
