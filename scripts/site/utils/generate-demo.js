const path = require('path');
const fs = require('fs');
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');
const generateTitle = require('./generate.title');

/**
 * Generate demos for the component
 * @param {string} showCaseComponentPath The path of the component
 * @param {ComponentDemo} result The result of the component
 */
module.exports = function (showCaseComponentPath, result) {
  if (result.pageDemo) {
    const pageDemoComponent = generatePageDemoComponent(result);
    fs.writeFileSync(path.join(showCaseComponentPath, `zh.page.component.ts`), pageDemoComponent.zh);
    fs.writeFileSync(path.join(showCaseComponentPath, `en.page.component.ts`), pageDemoComponent.en);
  }
  const demoTemplate = generateTemplate(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.html`), demoTemplate.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.html`), demoTemplate.en);
  const demoComponent = generateDemoComponent(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.component.ts`), demoComponent.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.component.ts`), demoComponent.en);
  if (result.standalone) {
    const demoRoutes = generateDemoRoutes(result);
    fs.writeFileSync(path.join(showCaseComponentPath, `routes.ts`), demoRoutes);
  } else {
    const demoModule = generateDemoModule(result);
    fs.writeFileSync(path.join(showCaseComponentPath, `index.module.ts`), demoModule);
  }
};

/**
 * @param {ComponentDemo} content
 * @return {string}
 */
function generateDemoModule(content) {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-module.template.ts')));
  const component = content.name;
  let { imports, declarations } = generateDemoImports(content);
  if (content.pageDemo) {
    imports += `import { NzPageDemo${componentName(component)}ZhComponent } from './zh.page.component';\n`;
    imports += `import { NzPageDemo${componentName(component)}EnComponent } from './en.page.component';\n`;
    declarations += `\t\tNzPageDemo${componentName(component)}ZhComponent,\n`;
    declarations += `\t\tNzPageDemo${componentName(component)}EnComponent,\n`;
  }
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{component}}/g, componentName(component));
}

/**
 * @param {ComponentDemo} content
 * @return {{imports: string, declarations: string}}
 */
function generateDemoImports(content) {
  const component = content.name;
  const demoMap = content.demoMap;
  let imports = '';
  let declarations = '';
  for (const key in demoMap) {
    const declareComponents = [`NzDemo${componentName(component)}${componentName(key)}Component`];
    const entries = retrieveEntryComponents(demoMap[key] && demoMap[key].ts);
    declareComponents.push(...entries);
    imports += `import { ${declareComponents.join(', ')} } from './${key}';\n`;
    declarations += `\t\t${declareComponents.join(',\n\t')},\n`;
  }
  if (!content.standalone) {
    imports += `import { NzDemo${componentName(component)}ZhComponent } from './zh.component';\n`;
    imports += `import { NzDemo${componentName(component)}EnComponent } from './en.component';\n`;
    declarations += `\t\tNzDemo${componentName(component)}ZhComponent,\n`;
    declarations += `\t\tNzDemo${componentName(component)}EnComponent,\n`;
  }
  return { imports, declarations };
}

/**
 * @param {ComponentDemo} content
 * @return {string}
 */
function generateDemoRoutes(content) {
  const demoRoutesTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-routes.template.ts')));
  const component = content.name;
  return demoRoutesTemplate.replace(/{{component}}/g, componentName(component));
}

function componentName(component) {
  return camelCase(capitalizeFirstLetter(component));
}

function generateComponentName(component, language) {
  return `NzDemo${componentName(component)}${capitalizeFirstLetter(language)}Component`;
}

/**
 * @param {ComponentDemo} content
 * @return {{zh: string, en: string}}
 */
function generatePageDemoComponent(content) {
  const component = content.name;
  let zhOutput = content.pageDemo.zhCode;
  let enOutput = content.pageDemo.enCode;
  zhOutput = zhOutput
    .replace(`NzPageDemo${componentName(component)}Component`, `NzPageDemo${componentName(component)}ZhComponent`)
    .replace(`nz-page-demo-${component}`, `nz-page-demo-${component}-zh`);
  enOutput = enOutput
    .replace(`NzPageDemo${componentName(component)}Component`, `NzPageDemo${componentName(component)}EnComponent`)
    .replace(`nz-page-demo-${component}`, `nz-page-demo-${component}-en`);
  return {
    en: enOutput,
    zh: zhOutput
  };
}

/**
 * @param {ComponentDemo} content
 * @return {{zh: string, en: string}}
 */
function generateDemoComponent(content) {
  const demoComponentTemplate = String(
    fs.readFileSync(path.resolve(__dirname, `../template/demo-component${content.standalone ? '.standalone' : ''}.template.ts`))
  );
  const component = content.name;

  let output = demoComponentTemplate.replace(/{{component}}/g, component);
  let zhOutput = output;
  let enOutput = output;

  if (content.standalone) {
    let { imports, declarations } = generateDemoImports(content);

    if (content.pageDemo) {
      // zh
      let zhImports = imports + `import { NzPageDemo${componentName(component)}ZhComponent } from './zh.page.component';\n`;
      let zhDeclarations = declarations + `\t\tNzPageDemo${componentName(component)}ZhComponent,\n`;
      zhOutput = zhOutput.replace(/{{imports}}/g, zhImports);
      zhOutput = zhOutput.replace(/{{declarations}}/g, zhDeclarations);
      // en
      let enImports = imports + `import { NzPageDemo${componentName(component)}EnComponent } from './en.page.component';\n`;
      let enDeclarations = declarations + `\t\tNzPageDemo${componentName(component)}EnComponent,\n`;
      enOutput = enOutput.replace(/{{imports}}/g, enImports);
      enOutput = enOutput.replace(/{{declarations}}/g, enDeclarations);
    } else {
      output = output.replace(/{{imports}}/g, imports);
      output = output.replace(/{{declarations}}/g, declarations);
      zhOutput = output;
      enOutput = output;
    }
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

/**
 * @param {ComponentDemo} result
 * @return {{zh: string, en: string}}
 */
function generateTemplate(result) {
  const generateTitle = require('./generate.title');
  const innerMap = generateExample(result);
  const name = result.name;
  const hasPageDemo = !!result.pageDemo;
  return {
    zh: wrapperAll(
      generateToc('zh-CN', result.name, result.demoMap),
      wrapperHeader(
        generateTitle(result.docZh.meta, result.docZh.path),
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
        generateTitle(result.docEn.meta, result.docEn.path),
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

function wrapperAPI(content) {
  return `<section class="markdown api-container" ngNonBindable>${content}</section>`;
}

/**
 * @param {string} title
 * @param {string} whenToUse
 * @param {string} language
 * @param {string} example
 * @param {boolean} hasPageDemo
 * @param {string} name
 * @param {ComponentIndexDocMeta} metadata
 * @return {string}
 */
function wrapperHeader(title, whenToUse, language, example, hasPageDemo, name, metadata) {
  const isZh = language === 'zh';
  const meta = `<component-meta name="${name}" description="${metadata.rawDescription}" language="${language}"></component-meta>`;
  let experimental = '';

  if (metadata.experimental) {
    if (isZh) {
      experimental = `
<blockquote style="border-color: #faad14">
<p>NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。</p>
<p>开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 <strong>breaking changes</strong>。</p>
</blockquote>`
    } else {
      experimental = `
<blockquote style="border-color: #faad14">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>`
    }
  }

  const pageDemo = hasPageDemo ? `<section class="page-demo"><nz-page-demo-${name}-${language}></nz-page-demo-${name}-${language}></section>` : '';

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

function wrapperAll(toc, header, content) {
  return `<article>${toc}${header}${content}</article>`;
}

/**
 *
 * @param {string} language
 * @param {string }name
 * @param {Record.<string, ComponentDemoDoc>} demoMap
 * @return {string}
 */
function generateToc(language, name, demoMap) {
  let linkArray = [];
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

/**
 * @param {ComponentDemo} result
 * @return {{zh: string, en: string}}
 */
function generateExample(result) {
  const demoMap = result.demoMap;
  const isZhUnion = result.docZh.meta.cols;
  const isEnUnion = result.docEn.meta.cols;
  const templateSplit = String(fs.readFileSync(path.resolve(__dirname, '../template/example-split.template.html')));
  const templateUnion = String(fs.readFileSync(path.resolve(__dirname, '../template/example-union.template.html')));
  let demoList = [];
  for (const key in demoMap) {
    demoList.push(Object.assign({ name: key }, demoMap[key]));
  }
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

/**
 *
 * @param {string} plainCode - plain code content
 * @return {Array.<string>}
 */
function retrieveEntryComponents(plainCode) {
  const matches = (plainCode + '').match(/^\/\*\s*?declarations:\s*([^\n]+?)\*\//) || [];
  if (matches[1]) {
    return matches[1]
      .split(',')
      .map(className => className.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);
  }
  return [];
}
