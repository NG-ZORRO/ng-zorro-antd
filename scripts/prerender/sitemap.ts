import { writeFileSync } from 'fs';
import { join } from 'path';
import * as sitemap from 'sitemap';
import { ROUTES } from './static.paths';

import { buildConfig } from '../build-config';

function generateUrls(lang: 'zh' | 'en'): sitemap.ISitemapItemOptionsLoose[] {
  const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, ''))));
  return urls.map(
    (r: string) => {
      return {
        url: `${r}/${lang}`,
        changefreq: sitemap.EnumChangefreq.WEEKLY,
        priority: r.includes('docs') ? 0.5 : 0.8,
        links: [{ lang: 'en', url: `${r}/en` }, { lang: 'zh', url: `${r}/zh` }]
      };
    }
  );
}
const sitemapInstance = sitemap.createSitemap({
  hostname: 'https://ng.ant.design',
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: sitemap.EnumChangefreq.WEEKLY, priority: 0.5, lastmodrealtime: true },
    ...generateUrls('en'),
    ...generateUrls('zh')
  ]
});

writeFileSync(join(buildConfig.outputDir, 'sitemap.xml'), sitemapInstance.toString(true));
