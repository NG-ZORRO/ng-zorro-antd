/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, existsSync, mkdirSync, readdirSync, readFileSync, removeSync, statSync } from 'fs-extra';
import pascalCase from 'pascalcase';

import path from 'path';

import { ComponentDemo, ComponentDemoDoc, ComponentDemoPage, ComponentIndexDocMeta, I18n } from './types';
import { generateCodeBox } from './utils/generate-code-box';
import { generateDemo } from './utils/generate-demo';
import { generateDemoCodeFiles } from './utils/generate-demo-code-files';
import { generateDocs } from './utils/generate-docs';
import { generateRoutes } from './utils/generate-routes';
import { getMeta } from './utils/get-meta';
import { parseDocMd, parseDemoMd } from './utils/parse-doc-md';

// create site folder
const showCasePath = path.resolve(__dirname, '../../site');

function nameWithoutSuffixUtil(name: string): string {
  return name.split('.')[0];
}

// handle components->${component}->page folder, parent component of demo page
function getPageDemo(componentDirPath: string): ComponentDemoPage | undefined {
  const pageDirPath = path.join(componentDirPath, 'page');
  if (existsSync(pageDirPath)) {
    const pageDir = readdirSync(pageDirPath);
    let zhLocale = '';
    let enLocale = '';
    let raw = '';

    pageDir.forEach(file => {
      if (/.ts$/.test(file)) {
        raw = String(readFileSync(path.join(pageDirPath, file)));
      }
      if (/^zh-CN.txt$/.test(file)) {
        zhLocale = String(readFileSync(path.join(pageDirPath, file)));
      }
      if (/^en-US.txt$/.test(file)) {
        enLocale = String(readFileSync(path.join(pageDirPath, file)));
      }
    });

    return {
      raw,
      enCode: raw.replace(/locale;/g, enLocale),
      zhCode: raw.replace(/locale;/g, zhLocale)
    };
  }
  return undefined;
}

export default function generate(target: string): void {
  const isSyncSpecific = target && target !== 'init';
  if (!target || target === 'init') {
    removeSync(showCasePath);
    copySync(path.resolve(__dirname, 'doc'), `${showCasePath}`);
  } else {
    removeSync(`${showCasePath}/app/${target}`);
  }
  const showCaseTargetPath = `${showCasePath}/app/`;
  // read components folder
  const rootPath = path.resolve(__dirname, '../../components');
  const rootDir = readdirSync(rootPath);
  const componentsDocMap: Record<string, I18n<ComponentIndexDocMeta>> = {};
  const componentsMap: Record<string, Record<string, ComponentDemoDoc>> = {};

  rootDir.forEach(componentName => {
    if (isSyncSpecific) {
      if (componentName !== target) {
        return;
      }
    }
    const componentDirPath = path.join(rootPath, componentName);
    const skips = ['style', 'core', 'locale', 'cdk', 'i18n', 'version', 'experimental'];
    if (skips.indexOf(componentName) !== -1) {
      return;
    }
    if (statSync(componentDirPath).isDirectory()) {
      // create site/doc/app->${component} folder
      const showCaseComponentPath = path.join(showCaseTargetPath, componentName);
      mkdirSync(showCaseComponentPath);

      // handle components->${component}->demo folder
      const demoDirPath = path.join(componentDirPath, 'demo');
      const demoMap: Record<string, ComponentDemoDoc> = {};
      const debugDemos = new Set();

      if (existsSync(demoDirPath)) {
        const demoDir = readdirSync(demoDirPath);
        demoDir.forEach(demo => {
          const nameKey = nameWithoutSuffixUtil(demo);
          if (/.md$/.test(demo)) {
            const demoMarkDownFile = readFileSync(path.join(demoDirPath, demo));
            const demoMeta = parseDemoMd(demoMarkDownFile);

            if (demoMeta.meta.debug && process.env.NODE_ENV !== 'development') {
              debugDemos.add(nameKey);
              return;
            }

            const name = `NzDemo${pascalCase(componentName)}${pascalCase(nameKey)}Component`;
            demoMap[nameKey] = {
              ...demoMeta,
              key: nameKey,
              name,
              enCode: generateCodeBox(
                componentName,
                name,
                nameKey,
                demoMeta.meta.title['en-US'],
                demoMeta.meta.version,
                demoMeta.en,
                demoMeta.meta.iframe
              ),
              zhCode: generateCodeBox(
                componentName,
                name,
                nameKey,
                demoMeta.meta.title['zh-CN'],
                demoMeta.meta.version,
                demoMeta.zh,
                demoMeta.meta.iframe
              ),
              ts: readFileSync(path.join(demoDirPath, `${nameKey}.ts`)).toString()
            };
          }

          if (/.ts$/.test(demo) && !debugDemos.has(nameKey)) {
            // copy ts file to site->${component} folder
            copySync(path.join(demoDirPath, demo), path.join(showCaseComponentPath, demo));
          }
        });
      }

      // handle components->${component}->doc folder
      const result: ComponentDemo = {
        name: componentName,
        docZh: parseDocMd(
          readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')),
          `components/${componentName}/doc/index.zh-CN.md`
        ),
        docEn: parseDocMd(
          readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')),
          `components/${componentName}/doc/index.en-US.md`
        ),
        demoMap,
        pageDemo: getPageDemo(componentDirPath)
      };
      componentsDocMap[componentName] = {
        zh: result.docZh.meta,
        en: result.docEn.meta
      };
      componentsMap[componentName] = demoMap;
      generateDemo(showCaseComponentPath, result);
      generateDemoCodeFiles(result, showCasePath);
    }
  });

  if (!isSyncSpecific) {
    // read docs folder
    const docsPath = path.resolve(__dirname, '../../docs');
    const docsDir = readdirSync(docsPath);
    const docsMap: Record<string, I18n<Buffer>> = {};
    const docsMeta: Record<string, I18n<ComponentIndexDocMeta>> = {};
    docsDir.forEach(doc => {
      const name = nameWithoutSuffixUtil(doc);
      docsMap[name] = {
        zh: readFileSync(path.join(docsPath, `${name}.zh-CN.md`)),
        en: readFileSync(path.join(docsPath, `${name}.en-US.md`))
      };
      docsMeta[name] = {
        zh: getMeta(docsMap[name].zh),
        en: getMeta(docsMap[name].en)
      };
    });

    generateDocs(showCaseTargetPath, docsMap);
    generateRoutes(showCaseTargetPath, componentsDocMap, docsMeta);
  }
}
