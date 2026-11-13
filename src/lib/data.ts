import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
export const getPage = (file: string) => requestWithMetadata(client.queries.page({ relativePath: file }), { priority: 'primary' });
export const getArticle = (file: string) => requestWithMetadata(client.queries.article({ relativePath: file }), { priority: 'primary' });
export const getSettings = () => requestWithMetadata(client.queries.settings({ relativePath: 'site.json' }));
