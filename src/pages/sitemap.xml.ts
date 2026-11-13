import type { APIRoute } from 'astro';
import { entries, pageUrl } from '../lib/content';
export const GET: APIRoute = () => {
  const urls = [...entries('pages').map((item: any) => pageUrl(item.slug)), ...entries('articles').map((item: any) => `/articles/${item.slug}/`)];
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(path => `<url><loc>https://fullpsych.com${path}</loc></url>`).join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
};
