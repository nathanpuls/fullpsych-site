import type { IslandRegistry } from '@tinacms/astro/experimental';
import PageBody from '../components/PageBody.astro';
import Navigation from '../components/Navigation.astro';
import { getPage, getSettings } from './data';
export const islands: IslandRegistry = {
  navigation: {
    fetch: () => getSettings(),
    component: Navigation,
    wrapper: { tag: 'div' },
    propsFromData: (result: any) => ({ settings: result.data?.settings }),
  },
  page: {
    fetch: (_request, params) => getPage(params.get('slug') ?? 'home'),
    component: PageBody,
    wrapper: { tag: 'main' },
    propsFromData: (result: any) => ({ data: result.data?.page }),
  },
};

