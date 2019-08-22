import { writeFileSync } from 'fs';
import { join } from 'path';
import * as sitemap from 'sitemap';
import { ROUTES } from './static.paths';

import { buildConfig } from '../build-config';

const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, '')))).map(
  (r: string) => {
    return {
      url: `${r}/en`,
      changefreq: 'weekly',
      priority: r.includes('docs') ? 0.5 : 0.8,
      links: [{ lang: 'en', url: `${r}/en` }, { lang: 'zh', url: `${r}/zh` }]
    };
  }
// tslint:disable-next-line:no-any
) as any;

const sitemapInstance = sitemap.createSitemap({
  hostname: 'https://ng.ant.design',
  cacheTime: 600000,
  urls: [{ url: '/', changefreq: 'weekly', priority: 0.5, lastmodrealtime: true }, ...urls]
});

writeFileSync(join(buildConfig.outputDir, 'sitemap.xml'), sitemapInstance.toString());
