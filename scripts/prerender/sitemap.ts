import { readFileSync, writeFileSync } from 'fs';
import * as os from 'os';
import { join, resolve } from 'path';
import * as sitemap from 'sitemap';
import { buildConfig } from '../build-config';

// tslint:disable-next-line:no-any
const priorityMap: any = {
  '/docs/introduce/en': 1,
  '/docs/getting-started/en': 0.9,
  '/docs/schematics/en': 0.8,
  '/docs/i18n/en': 0.8,
  '/docs/faq/en': 0.7,
  '/docs/changelog/en': 0.7
};

const ROUTES = readFileSync(resolve(__dirname, 'route-paths.txt')).toString().split(os.EOL) as string[];

function generateUrls(lang: 'zh' | 'en'): sitemap.ISitemapItemOptionsLoose[] {
  const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, ''))));
  return urls.map((r: string) => {
    const url = `${r}/${lang}`;
    return {
      url,
      changefreq: sitemap.EnumChangefreq.WEEKLY,
      priority: priorityMap[url] || 0.5,
      links: [
        { lang: 'en', url: `${r}/en` },
        { lang: 'zh', url: `${r}/zh` }
      ]
    };
  });
}

export function generateSitemap(): void {
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
}
