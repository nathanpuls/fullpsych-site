import type { IslandRegistry } from '@tinacms/astro/experimental';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import PageBody from '../components/PageBody.astro';
import ArticleBody from '../components/ArticleBody.astro';
import { getPage, getArticle, getSettings } from './data';
export const islands: IslandRegistry = {
  footer: { fetch: () => getSettings(), component: Footer, wrapper: { tag: 'div', className: 'site-footer-wrapper' }, propsFromData: (result: any) => ({ settings: result.data.settings }) },
  header: { fetch: () => getSettings(), component: Header, wrapper: { tag: 'div', className: 'site-header-wrapper' }, propsFromData: (result: any, params: any) => ({ settings: result.data.settings, pathname: params?.get?.('pathname') }) },
  page: {
    fetch: async (_request, params) => ({ ...(await getPage(params.get('file') || 'home.mdx')), settings: (await getSettings()).data.settings }),
    component: PageBody, wrapper: { tag: 'main', className: 'page-content' },
    propsFromData: (result: any) => ({ data: result.data.page, settings: result.settings }),
  },
  article: { fetch: (_request, params) => getArticle(params.get('file') || ''), component: ArticleBody, wrapper: { tag: 'main', className: 'page-content' }, propsFromData: (result: any) => ({ data: result.data.article }) },
};
