/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, writeFileSync } from 'fs-extra';
import pascalCase from 'pascalcase';

import path from 'path';

import { generateTitle } from './generate-title';
import { ComponentDemo, ComponentDemoDoc, ComponentIndexDocMeta, I18nTitle, I18n } from '../types';

/**
 * Generate demos for the component
 * @param showCaseComponentPath The path of the component
 * @param result The result of the component
 */
export function generateDemo(showCaseComponentPath: string, result: ComponentDemo): void {
  if (result.pageDemo) {
    const pageDemoComponent = generatePageDemoComponent(result);
    writeFileSync(path.join(showCaseComponentPath, `zh.page.component.ts`), pageDemoComponent.zh);
    writeFileSync(path.join(showCaseComponentPath, `en.page.component.ts`), pageDemoComponent.en);
  }
  const demoTemplate = generateTemplate(result);
  writeFileSync(path.join(showCaseComponentPath, `zh.html`), demoTemplate.zh);
  writeFileSync(path.join(showCaseComponentPath, `en.html`), demoTemplate.en);
  const demoComponent = generateDemoComponent(result);
  writeFileSync(path.join(showCaseComponentPath, `zh.component.ts`), demoComponent.zh);
  writeFileSync(path.join(showCaseComponentPath, `en.component.ts`), demoComponent.en);
  const demoRoutes = generateDemoRoutes(result);
  writeFileSync(path.join(showCaseComponentPath, `routes.ts`), demoRoutes);
}

function generateDemoImports(content: ComponentDemo): { imports: string; declarations: string[] } {
  const component = content.name;
  const demoMap = content.demoMap;
  let imports = '';
  const declarations: string[] = [];
  for (const key in demoMap) {
    const declareComponents = [`NzDemo${pascalCase(component)}${pascalCase(key)}Component`];
    const entries = retrieveEntryComponents(demoMap[key].ts);
    declareComponents.push(...entries);
    imports += `import { ${declareComponents.join(', ')} } from './${key}';\n`;
    declarations.push(...declareComponents);
  }
  return { imports, declarations };
}

function generateDemoRoutes(content: ComponentDemo): string {
  const demoRoutesTemplate = String(readFileSync(path.resolve(__dirname, '../template/demo-routes.template.ts')));
  const component = content.name;
  return demoRoutesTemplate.replace(/{{component}}/g, pascalCase(component));
}

function generateComponentName(component: string, language: string): string {
  return `NzDemo${pascalCase(component)}${pascalCase(language)}Component`;
}

function generatePageDemoComponent(content: ComponentDemo): I18n<string> {
  const component = content.name;
  let zhOutput = content.pageDemo!.zhCode;
  let enOutput = content.pageDemo!.enCode;
  zhOutput = zhOutput
    .replace(`NzPageDemo${pascalCase(component)}Component`, `NzPageDemo${pascalCase(component)}ZhComponent`)
    .replace(`nz-page-demo-${component}`, `nz-page-demo-${component}-zh`);
  enOutput = enOutput
    .replace(`NzPageDemo${pascalCase(component)}Component`, `NzPageDemo${pascalCase(component)}EnComponent`)
    .replace(`nz-page-demo-${component}`, `nz-page-demo-${component}-en`);
  return {
    en: enOutput,
    zh: zhOutput
  };
}

function generateDemoComponent(content: ComponentDemo): I18n<string> {
  const demoComponentTemplate = String(readFileSync(path.resolve(__dirname, `../template/demo-component.template.ts`)));
  const component = content.name;

  let output = demoComponentTemplate.replace(/{{component}}/g, component);
  let zhOutput = output;
  let enOutput = output;

  const { imports, declarations } = generateDemoImports(content);

  if (content.pageDemo) {
    // zh
    const zhImports = `${imports}import { NzPageDemo${pascalCase(component)}ZhComponent } from './zh.page.component';\n`;
    const zhDeclarations = [...declarations, `NzPageDemo${pascalCase(component)}ZhComponent`];
    zhOutput = zhOutput.replace(/{{imports}}/g, zhImports);
    zhOutput = zhOutput.replace(/{{declarations}}/g, zhDeclarations.join(', '));
    // en
    const enImports = `${imports}import { NzPageDemo${pascalCase(component)}EnComponent } from './en.page.component';\n`;
    const enDeclarations = [...declarations, `NzPageDemo${pascalCase(component)}EnComponent`];
    enOutput = enOutput.replace(/{{imports}}/g, enImports);
    enOutput = enOutput.replace(/{{declarations}}/g, enDeclarations.join(', '));
  } else {
    output = output.replace(/{{imports}}/g, imports);
    output = output.replace(/{{declarations}}/g, declarations.join(', '));
    zhOutput = output;
    enOutput = output;
  }

  enOutput = enOutput.replace(/{{componentName}}/g, generateComponentName(component, 'en'));
  enOutput = enOutput.replace(/{{language}}/g, 'en');
  zhOutput = zhOutput.replace(/{{componentName}}/g, generateComponentName(component, 'zh'));
  zhOutput = zhOutput.replace(/{{language}}/g, 'zh');

  return {
    en: enOutput,
    zh: zhOutput
  };
}

function generateTemplate(result: ComponentDemo): I18n<string> {
  const innerMap = generateExample(result);
  const name = result.name;
  const hasPageDemo = !!result.pageDemo;
  return {
    zh: wrapperAll(
      generateToc('zh-CN', result.name, result.demoMap),
      wrapperHeader(
        generateTitle(result.docZh.meta),
        result.docZh.whenToUse,
        'zh',
        innerMap.zh,
        hasPageDemo,
        name,
        result.docZh.meta
      ),
      wrapperAPI(result.docZh.api)
    ),
    en: wrapperAll(
      generateToc('en-US', result.name, result.demoMap),
      wrapperHeader(
        generateTitle(result.docEn.meta),
        result.docEn.whenToUse,
        'en',
        innerMap.en,
        hasPageDemo,
        name,
        result.docEn.meta
      ),
      wrapperAPI(result.docEn.api)
    )
  };
}

function wrapperAPI(content: string): string {
  return `<section class="markdown api-container" ngNonBindable>${content}</section>`;
}

function wrapperHeader(
  title: string,
  whenToUse: string,
  language: string,
  example: string,
  hasPageDemo: boolean,
  name: string,
  metadata: ComponentIndexDocMeta
): string {
  const isZh = language === 'zh';
  const meta = `<component-meta name="${name}" description="${metadata.rawDescription}" language="${language}"></component-meta>`;
  let experimental = '';

  if (metadata.experimental) {
    if (isZh) {
      experimental = `
<blockquote style="border-color: #faad14">
<p>NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。</p>
<p>开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 <strong>breaking changes</strong>。</p>
</blockquote>`;
    } else {
      experimental = `
<blockquote style="border-color: #faad14">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>`;
    }
  }

  const pageDemo = hasPageDemo
    ? `<section class="page-demo"><nz-page-demo-${name}-${language}></nz-page-demo-${name}-${language}></section>`
    : '';

  if (example) {
    return `<section class="markdown">
  ${title}
  ${meta}
  ${experimental}
  <section class="markdown" ngNonBindable>
    ${whenToUse}
  </section>
  ${pageDemo}
  <h2>
    <span>${isZh ? '代码演示' : 'Examples'}</span>
    <nz-icon nzType="appstore" class="code-box-expand-trigger" nz-tooltip nzTooltipTitle="${
      isZh ? '展开全部代码' : 'Expand All Code'
    }" (click)="expandAllCode()" />
  </h2>
</section>
${example}`;
  } else {
    return `<section class="markdown">
  ${title}
  ${meta}
  <section class="markdown">
    ${whenToUse}
  </section>
</section>`;
  }
}

function wrapperAll(toc: string, header: string, content: string): string {
  return `<article>${toc}${header}${content}</article>`;
}

function generateToc(language: keyof I18nTitle, name: string, demoMap: Record<string, ComponentDemoDoc>): string {
  const linkArray = [];
  for (const key in demoMap) {
    linkArray.push({
      content: `<nz-link nzHref="#components-${name}-demo-${key}" nzTitle="${demoMap[key].meta.title[language]}"></nz-link>`,
      order: demoMap[key].meta.order
    });
  }
  linkArray.sort((pre, next) => pre.order - next.order);
  linkArray.push({ content: `<nz-link nzHref="#api" nzTitle="API"></nz-link>` });
  const links = linkArray.map(link => link.content).join('');
  return `
<nz-affix class="toc-affix" [nzOffsetTop]="16">
  <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
    ${links}
  </nz-anchor>
</nz-affix>`;
}

function generateExample(result: ComponentDemo): I18n<string> {
  const demoMap = result.demoMap;
  const isZhUnion = result.docZh.meta.cols === 1;
  const isEnUnion = result.docEn.meta.cols === 1;
  const templateSplit = String(readFileSync(path.resolve(__dirname, '../template/example-split.template.html')));
  const templateUnion = String(readFileSync(path.resolve(__dirname, '../template/example-union.template.html')));
  const demoList = Object.values(demoMap);
  demoList.sort((pre, next) => pre.meta.order - next.meta.order);
  let firstZhPart = '';
  let secondZhPart = '';
  let firstEnPart = '';
  let secondEnPart = '';
  let enPart = '';
  let zhPart = '';
  demoList.forEach((item, index) => {
    enPart += item.enCode;
    zhPart += item.zhCode;
    if (index % 2 === 0) {
      firstZhPart += item.zhCode;
      firstEnPart += item.enCode;
    } else {
      secondZhPart += item.zhCode;
      secondEnPart += item.enCode;
    }
  });
  return {
    zh: isZhUnion
      ? templateUnion.replace(/{{content}}/g, zhPart)
      : templateSplit.replace(/{{first}}/g, firstZhPart).replace(/{{second}}/g, secondZhPart),
    en: isEnUnion
      ? templateUnion.replace(/{{content}}/g, enPart)
      : templateSplit.replace(/{{first}}/g, firstEnPart).replace(/{{second}}/g, secondEnPart)
  };
}

function retrieveEntryComponents(plainCode: string): string[] {
  const matches = `${plainCode}`.match(/^\/\*\s*?declarations:\s*([^\n]+?)\*\//) || [];
  if (matches[1]) {
    return matches[1]
      .split(',')
      .map(className => className.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);
  }
  return [];
}
