const path = require('path');
const fs = require('fs');
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

module.exports = function (showCaseComponentPath, result) {
  const demoTemplate = generateTemplate(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.html`), demoTemplate.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.html`), demoTemplate.en);
  const demoComponent = generateDemoComponent(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.component.ts`), demoComponent.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.component.ts`), demoComponent.en);
  const demoModule = generateDemoModule(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `index.module.ts`), demoModule);
};

function generateDemoModule(content) {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-module.template.ts')));
  const component = content.name;
  const demoMap = content.demoMap;
  let imports = '';
  let declarations = '';
  let entryComponents = [];
  for (const key in demoMap) {
    const declareComponents = [ `NzDemo${componentName(component)}${componentName(key)}Component` ];
    const entries = retrieveEntryComponents(demoMap[key] && demoMap[key].ts);
    entryComponents.push(...entries);
    declareComponents.push(...entries);
    imports += `import { ${declareComponents.join(', ')} } from './${key}';\n`;
    declarations += `\t\t${declareComponents.join(',\n\t')},\n`;
  }
  imports += `import { NzDemo${componentName(component)}ZhComponent } from './zh.component';\n`;
  imports += `import { NzDemo${componentName(component)}EnComponent } from './en.component';\n`;
  declarations += `\t\tNzDemo${componentName(component)}ZhComponent,\n`;
  declarations += `\t\tNzDemo${componentName(component)}EnComponent,\n`;
  return demoModuleTemplate.replace(/{{imports}}/g, imports).replace(/{{declarations}}/g, declarations).replace(/{{component}}/g, componentName(component)).replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function componentName(component) {
  return camelCase(capitalizeFirstLetter(component));
}

function generateComponentName(component, language) {
  return `NzDemo${componentName(component)}${capitalizeFirstLetter(language)}Component`
}


function generateDemoComponent(content) {
  const demoComponentTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-component.template.ts')));
  const component = content.name;
  const demoMap = content.demoMap;
  let code = '';
  for (const key in demoMap) {
    code += `\t${camelCase(key)} = require('!!raw-loader!./${key}.ts');\n`;
  }
  let output = demoComponentTemplate;
  output = output.replace(/{{component}}/g, component);
  output = output.replace(/{{code}}/g, code);
  let zhOutput = output;
  let enOutput = output;
  enOutput = enOutput.replace(/{{componentName}}/g, generateComponentName(component, 'en'));
  enOutput = enOutput.replace(/{{language}}/g, 'en');
  zhOutput = zhOutput.replace(/{{componentName}}/g, generateComponentName(component, 'zh'));
  zhOutput = zhOutput.replace(/{{language}}/g, 'zh');
  return {
    en: enOutput,
    zh: zhOutput
  };
}

function generateTemplate(result) {
  const generateTitle = require('./generate.title');
  let zhCode = '';
  let enCode = '';
  for (const key in result.demoMap) {
    zhCode += result.demoMap[key].zhCode;
    enCode += result.demoMap[key].enCode;
  }
  const innerMap = generateExample(result);

  const titleMap = {
    zh: generateTitle(result.docZh.meta.title, result.docZh.meta.subtitle, result.docZh.path),
    en: generateTitle(result.docEn.meta.title, '', result.docEn.path)
  };
  return {
    zh: wrapperAll(generateToc('zh-CN', result.name, result.demoMap), wrapperHeader(titleMap.zh, result.docZh.whenToUse, 'zh', innerMap.zh) + wrapperAPI(result.docZh.api)),
    en: wrapperAll(generateToc('en-US', result.name, result.demoMap), wrapperHeader(titleMap.en, result.docEn.whenToUse, 'en', innerMap.en) + wrapperAPI(result.docEn.api))
  }
};

function wrapperAPI(content) {
  return `<section class="markdown api-container" ngNonBindable>${content}</section>`
}

function wrapperHeader(title, whenToUse, language, example) {
  if (example) {
    return `<section class="markdown">
	${title}
	<section class="markdown" ngNonBindable>
		${whenToUse}
	</section>
	<h2>
		<span>${language === 'zh' ? '代码演示' : 'Examples'}</span>
		<i class="anticon anticon-appstore code-box-expand-trigger" title="${language === 'zh' ? '展开全部代码' : 'expand all code'}" (click)="expandAllCode()"></i>
	</h2>
</section>${example}`
  } else {
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
	</section></section>`
  }

}

function wrapperAll(toc, content) {
  return `<article>${toc}${content}</article>`
}

function generateToc(language, name, demoMap) {
  let linkArray = [];
  for (const key in demoMap) {
    linkArray.push(
      {
        content: `<nz-link nzHref="#components-${name}-demo-${key}" nzTitle="${demoMap[key].meta.title[language]}"></nz-link>`,
        order  : demoMap[key].meta.order
      }
    );
  }
  linkArray.sort((pre, next) => pre.order - next.order);
  const link = linkArray.map(link => link.content).join('');
  return `  <div class="toc-affix fixed">
    <nz-anchor>${link}</nz-anchor>
  </div>`;
}

function generateExample(result) {
  const demoMap = result.demoMap;
  const isZhUnion = result.docZh.meta.cols;
  const isEnUnion = result.docEn.meta.cols;
  const isEnIcon = result.docEn.meta.title === 'Icon';
  const isZhIcon = result.docZh.meta.title === 'Icon';
  const templateSplit = String(fs.readFileSync(path.resolve(__dirname, '../template/example-split.template.html')));
  const templateUnion = String(fs.readFileSync(path.resolve(__dirname, '../template/example-union.template.html')));
  let demoList = [];
  for (const key in demoMap) {
    demoList.push(Object.assign(
      {name: key}, demoMap[key]
    ))
  }
  demoList = demoList.sort((pre, next) => pre.meta.order - next.meta.order);
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
    zh: isZhIcon ? '' : (isZhUnion ? templateUnion.replace(/{{content}}/g, zhPart) : templateSplit.replace(/{{first}}/g, firstZhPart).replace(/{{second}}/g, secondZhPart)),
    en: isEnIcon ? '' : (isEnUnion ? templateUnion.replace(/{{content}}/g, enPart) : templateSplit.replace(/{{first}}/g, firstEnPart).replace(/{{second}}/g, secondEnPart))
  }
}

function retrieveEntryComponents(plainCode) {
  var matches = (plainCode + '').match(/^\/\*\s*?entryComponents:\s*([^\n]+?)\*\//) || [];
  if (matches[1]) {
    return matches[1].split(',').map(className => className.trim()).filter((value, index, self) => value && self.indexOf(value) === index);
  }
  return [];
}
