import { readdirSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
export function entries(collection: 'pages' | 'articles') {
  return readdirSync(`content/${collection}`).filter(file => file.endsWith('.mdx')).map(file => {
    const { data } = matter(readFileSync(`content/${collection}/${file}`, 'utf8'));
    return { file, ...data, slug: String(data.slug || file.replace(/\.mdx$/, '')) };
  }).filter((entry: any) => import.meta.env.DEV || entry.published !== false);
}
export const pageUrl = (slug: string) => slug === 'home' ? '/' : `/${slug}/`;
export const readableDate = (value: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(value)) : '';
export const articles = () => entries('articles').filter((item: any) => item.published !== false).sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0));
