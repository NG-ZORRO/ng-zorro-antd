/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, writeFileSync } from 'fs-extra';
import * as sitemap from 'sitemap';

import * as os from 'os';
import { resolve } from 'path';

import { buildConfig } from '../build-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priorityMap: any = {
  '/docs/introduce/en': 1,
  '/docs/getting-started/en': 0.8,
  '/docs/schematics/en': 0.8,
  '/docs/i18n/en': 0.8,
  '/docs/faq/en': 0.8
};

const ROUTES = readFileSync(resolve(__dirname, 'route-paths.txt')).toString().split(os.EOL) as string[];

function generateUrls(lang: 'zh' | 'en'): sitemap.ISitemapItemOptionsLoose[] {
  const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, ''))));
  return urls.map((r: string) => {
    const url = `${r}/${lang}`;
    return {
      url,
      changefreq: sitemap.EnumChangefreq.HOURLY,
      priority: priorityMap[url] || 0.6,
      lastmodrealtime: true,
      lastmodISO: new Date().toISOString(),
      links: [
        { lang: 'en', url: `${r}/en` },
        { lang: 'zh', url: `${r}/zh` },
        { lang: 'x-default', url: `${r}/en` }
      ]
    };
  });
}

export function generateSitemap(): void {
  const sitemapInstance = sitemap.createSitemap({
    hostname: 'https://ng.ant.design',
    cacheTime: 600000,
    urls: [
      {
        url: '/',
        changefreq: sitemap.EnumChangefreq.HOURLY,
        priority: 1,
        lastmodrealtime: true,
        lastmodISO: new Date().toISOString()
      },
      ...generateUrls('en'),
      ...generateUrls('zh')
    ]
  });
  writeFileSync(resolve(buildConfig.outputDir, 'sitemap.xml'), sitemapInstance.toString(true));
}
