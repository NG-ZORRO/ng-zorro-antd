/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, writeFileSync } from 'fs-extra';

import path from 'path';

import {
  ComponentChildRouter,
  ComponentIndexDocMap,
  ComponentIndexDocMeta,
  I18n,
  Language,
  RouterList
} from '../types';

const templateRouter = String(readFileSync(path.resolve(__dirname, '../template/router.template.ts')));

/**
 * Generate routes for the target component
 */
function generateLanguageData(
  itemData: I18n<ComponentIndexDocMeta>,
  language: Language,
  reverseMap: Record<string, { list: ComponentChildRouter[]; language: Language }>,
  key: string
): void {
  const { subtitle = '', title, type, tag = '', cover, experimental, description = '', hidden } = itemData[language];
  const content: ComponentChildRouter = {
    label: title,
    path: `${experimental ? 'experimental' : 'components'}/${key}/${language}`,
    zh: subtitle,
    experimental,
    hidden,
    cover,
    tag,
    description
  };
  if (!reverseMap[type]) {
    reverseMap[type] = { list: [content], language };
  } else {
    reverseMap[type].list.push(content);
  }
}

function generateNav(componentsDocMap: ComponentIndexDocMap): {
  reverseMap: Record<string, { list: ComponentChildRouter[]; language: string }>;
  routes: string;
} {
  const reverseMap = {};
  let routes = '';
  for (const key in componentsDocMap) {
    generateLanguageData(componentsDocMap[key], 'zh', reverseMap, key);
    generateLanguageData(componentsDocMap[key], 'en', reverseMap, key);
    const experimental = componentsDocMap[key]['zh'].experimental || componentsDocMap[key]['en'].experimental;
    const routePath = `${experimental ? 'experimental' : 'components'}/${key}`;
    routes += `  {path: '${routePath}', loadChildren: () => import('./${key}/routes')},\n`;
  }
  return { reverseMap, routes };
}

/**
 * Generate routes file for the documentation site
 */
export function generateRoutes(
  showCaseTargetPath: string,
  componentsDocMap: ComponentIndexDocMap,
  docsMeta: ComponentIndexDocMap
): void {
  const router: RouterList = { intro: [], components: [] };
  for (const key in docsMeta) {
    const enMeta = docsMeta[key].en;
    const zhMeta = docsMeta[key].zh;
    router.intro.push({
      path: `docs/${key}/en`,
      label: enMeta.title,
      language: 'en',
      order: enMeta.order ?? 0,
      hidden: !!enMeta.hidden,
      description: enMeta.description ?? '',
      tag: enMeta.tag,
      experimental: !!enMeta.experimental
    });
    router.intro.push({
      path: `docs/${key}/zh`,
      label: zhMeta.title,
      language: 'zh',
      order: zhMeta.order ?? 0,
      hidden: !!zhMeta.hidden,
      description: zhMeta.description ?? '',
      tag: zhMeta.tag,
      experimental: !!zhMeta.experimental
    });
  }
  router.intro.sort((pre, next) => pre.order - next.order);
  writeFileSync(path.join(showCaseTargetPath, `intros.json`), JSON.stringify(router.intro, null, 2));
  const navData = generateNav(componentsDocMap);
  const routes = navData.routes;
  for (const key in navData.reverseMap) {
    router.components.push({
      name: key,
      language: navData.reverseMap[key].language,
      children: navData.reverseMap[key].list.filter(item => !item.experimental),
      experimentalChildren: navData.reverseMap[key].list.filter(item => item.experimental && !item.hidden)
    });
  }

  const sortMap: Record<string, number> = {
    General: 0,
    通用: 0,
    Layout: 1,
    布局: 1,
    Navigation: 2,
    导航: 2,
    'Data Entry': 3,
    数据录入: 3,
    'Data Display': 4,
    数据展示: 4,
    Feedback: 5,
    反馈: 5,
    Localization: 6,
    Other: 7,
    其他: 7
  };
  router.components.sort((pre, next) => sortMap[pre.name] - sortMap[next.name]);
  const fileContent = templateRouter
    .replace(/{{intro}}/g, JSON.stringify(router.intro, null, 2))
    .replace(/{{components}}/g, JSON.stringify(router.components, null, 2))
    .replace(/{{routes}}/g, routes);
  writeFileSync(path.join(showCaseTargetPath, `router.ts`), fileContent);
}
