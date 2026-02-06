/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs-extra';
import pascalCase from 'pascalcase';
import { remark } from 'remark';

import path from 'path';

import md from '../markdown';
import { ComponentIndexDocMetaTocConfig, I18n, Language } from '../types';
import { angularNonBindAble } from './angular-non-bindable';
import { generateTitle } from './generate-title';
import { getMeta } from './get-meta';

const componentTemplate = String(readFileSync(path.resolve(__dirname, '../template/doc-component.template.ts')));
const routesTemplate = String(readFileSync(path.resolve(__dirname, '../template/doc-routes.template.ts')));

/**
 * Generate docs in `/docs` folder
 */
export function generateDocs(rootPath: string, docsMap: Record<string, I18n<Buffer>>): void {
  const docsPath = `${rootPath}docs`;
  mkdirSync(docsPath);
  for (const name in docsMap) {
    generateDoc(docsMap[name].zh, docsPath, name, 'zh');
    generateDoc(docsMap[name].en, docsPath, name, 'en');
  }
  generateModule(docsPath, docsMap);
}

function generateDoc(file: Buffer, docsPath: string, name: string, language: Language): void {
  const meta = getMeta(file);
  const raw = meta.__content ?? '';
  delete meta.__content;
  const content = md.parse(raw, { async: false });
  const filename = `${name}-${language}`;
  const toc = meta.toc ?? true;

  // template.html
  writeFileSync(
    path.join(docsPath, `${filename}.html`),
    wrapperDocs(
      toc ? generateToc(raw, typeof toc === 'boolean' ? {} : toc) : '',
      generateTitle(meta),
      angularNonBindAble(content)
    )
  );
  // component.ts
  const component = componentTemplate
    .replace(/{{component}}/g, name)
    .replace(/{{language}}/g, language)
    .replace(/{{componentName}}/g, pascalCase(filename));
  writeFileSync(path.join(docsPath, `${filename}.ts`), component);
}

function wrapperDocs(toc: string, title: string, content: string): string {
  return `<article class="markdown">
  ${title}${toc}
  <section class="markdown" ngNonBindable>${content}</section>
</article>`;
}

function generateToc(raw: string, config: ComponentIndexDocMetaTocConfig): string {
  const ast = remark.parse(raw);
  const { depth = 3 } = config;
  const linkArray: string[] = [];
  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth > 1 && child.depth <= depth) {
      const firstChild = child.children[0];
      if (firstChild.type === 'text') {
        const text = firstChild.value;
        const lowerText = text
          .toLowerCase()
          .replace(/ /g, '_') // replace space with underscore
          .replace(/[?.]/g, ''); // remove special chars: `?` `.`
        const indent = child.depth - 1;
        linkArray.push(`<nz-link nzHref="#${lowerText}" class="toc-indent-${indent}" nzTitle="${text}"></nz-link>`);
      }
    }
  });
  const links = linkArray.join('\n');
  return `
<nz-affix class="toc-affix" [nzOffsetTop]="16">
  <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
    ${links}
  </nz-anchor>
</nz-affix>`;
}

function generateModule(docsPath: string, docsMap: Record<string, I18n<Buffer>>): void {
  let router = '';
  for (const name in docsMap) {
    router += `\t{ path: '${name}/zh', loadComponent: () => import('./${name}-zh') },\n`;
    router += `\t{ path: '${name}/en', loadComponent: () => import('./${name}-en') },\n`;
  }
  const module = routesTemplate.replace(/{{routes}}/g, router);
  writeFileSync(path.join(docsPath, `routes.ts`), module);
}
