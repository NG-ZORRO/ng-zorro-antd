import * as sitemap from 'sitemap';
import { writeFileSync } from 'fs';
import { ROUTES } from './static.paths';

const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, '')))).map(
  (r: string) => {
    return {
      url: `${r}/en`,
      changefreq: 'weekly',
      priority: r.includes('docs') ? 0.5 : 0.8,
      links: [{ lang: 'en', url: `${r}/en` }, { lang: 'zh', url: `${r}/zh` }]
    };
  }
);

const sitemapInstance = sitemap.createSitemap({
  hostname: 'https://ng.ant.design',
  cacheTime: 600000,
  urls: [{ url: '/', changefreq: 'weekly', priority: 0.5, lastmodrealtime: true }, ...urls]
});

writeFileSync('sitemap.xml', sitemapInstance.toString());
