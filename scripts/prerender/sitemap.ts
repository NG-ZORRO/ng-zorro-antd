/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, createWriteStream } from 'fs-extra';
import { EnumChangefreq, SitemapStream, SitemapItemLoose } from 'sitemap';

import * as os from 'os';
import { resolve } from 'path';

import { buildConfig } from '../build-config';

const priorityMap: Record<string, number> = {
  '/docs/introduce/en': 1,
  '/docs/getting-started/en': 0.8,
  '/docs/schematics/en': 0.8,
  '/docs/i18n/en': 0.8,
  '/docs/faq/en': 0.8
};

const ROUTES = readFileSync(resolve(__dirname, 'route-paths.txt')).toString().split(os.EOL) as string[];

function generateUrls(lang: 'zh' | 'en'): SitemapItemLoose[] {
  const urls = Array.from(new Set(ROUTES.filter(r => r !== '/').map(r => r.replace(/\/(zh|en)$/, ''))));
  return urls.map((r: string) => {
    const url = `${r}/${lang}`;
    return {
      url,
      changefreq: EnumChangefreq.HOURLY,
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

export function generateSitemap(hostname = 'https://ng.ant.design'): void {
  const sms = new SitemapStream({ hostname });
  sms.pipe(createWriteStream(resolve(`${buildConfig.outputDir}/browser`, 'sitemap.xml')));

  const urls: SitemapItemLoose[] = [
    {
      url: '/',
      changefreq: EnumChangefreq.HOURLY,
      priority: 1,
      lastmodrealtime: true,
      lastmodISO: new Date().toISOString()
    },
    ...generateUrls('en'),
    ...generateUrls('zh')
  ];
  urls.forEach(url => sms.write(url));
  sms.end();
}
