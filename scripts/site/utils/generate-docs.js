const MD = require('marked');
const YFM = require('yaml-front-matter');
const angularNonBindAble = require('./angular-nonbindable');
const fs = require('fs');
const path = require('path');
const generateTitle = require('./generate.title');
const componentTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/doc-component.template.ts')));
const moduleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/doc-module.template.ts')));
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

module.exports = function generateDocs(rootPath, docsMap) {
  const docsPath = `${rootPath}docs`;
  fs.mkdirSync(docsPath);

  for (const name in docsMap) {
    const zh = baseInfo(docsMap[name].zh, `docs/${name}.zh-CN.md`);
    const en = baseInfo(docsMap[name].en, `docs/${name}.en-US.md`);
    generateTemplate(docsPath, name, zh, en);
    generateComponent(docsPath, name);
  }
  generateModule(docsPath, docsMap);
};

function wrapperDocs(toc, title, content) {
  return `<article class="markdown">${title}${toc}
  <section class="markdown" ngNonBindable>${content}</section>
  </article>`
}

function generateToc(meta, raw) {
  if (meta.timeline) return '';
  const remark = require('remark')();
  const ast = remark.parse(raw);
  let links = '';
  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    if (child.type === 'heading' && child.depth === 2) {
      const text = child.children[0].value;
      const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g,'');
      links += `<nz-link nzHref="#${lowerText}" nzTitle="${text}"></nz-link>`
    }
  }
  return `<nz-affix class="toc-affix" [nzOffsetTop]="16">
    <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
      ${links}
    </nz-anchor>
  </nz-affix>`;
}

function baseInfo(file, path) {
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  delete meta.__content;
  return {
    meta   : meta,
    path   : path,
    content: MD(content),
    raw    : content
  }
}

function generateTemplate(docsPath, name, zh, en) {
  fs.writeFileSync(path.join(docsPath, `${name}-zh.html`), wrapperDocs(generateToc(zh.meta, zh.raw), generateTitle(zh.meta.title, '', zh.path), angularNonBindAble(zh.content)));
  fs.writeFileSync(path.join(docsPath, `${name}-en.html`), wrapperDocs(generateToc(en.meta, en.raw), generateTitle(en.meta.title, '', en.path), angularNonBindAble(en.content)));
}

function generateComponent(docsPath, name) {
  const zhComponent = componentTemplate.replace(/{{component}}/g, name).replace(/{{language}}/g, 'zh').replace(/{{componentName}}/g, `${capitalizeFirstLetter(camelCase(name))}Zh`);
  const enComponent = componentTemplate.replace(/{{component}}/g, name).replace(/{{language}}/g, 'en').replace(/{{componentName}}/g, `${capitalizeFirstLetter(camelCase(name))}En`);
  fs.writeFileSync(path.join(docsPath, `${name}-zh.ts`), zhComponent);
  fs.writeFileSync(path.join(docsPath, `${name}-en.ts`), enComponent);
}

function generateModule(docsPath, docsMap) {
  let imports = '';
  let router = '';
  let declarations = '';
  for (const name in docsMap) {
    const componentName = `NzDoc${capitalizeFirstLetter(camelCase(name))}`;
    const enComponentName = `${componentName}EnComponent`;
    const zhComponentName = `${componentName}ZhComponent`;
    imports += `import { ${enComponentName} } from './${name}-en';\n`;
    imports += `import { ${zhComponentName} } from './${name}-zh';\n`;
    router += `\t\t\t{ path: '${name}/zh', component: ${zhComponentName} },\n`;
    router += `\t\t\t{ path: '${name}/en', component: ${enComponentName} },\n`;
    declarations += `\t\t${zhComponentName},\n`;
    declarations += `\t\t${enComponentName},\n`;
  }
  const module = moduleTemplate.replace(/{{imports}}/g, imports).replace(/{{router}}/g, router).replace(/{{declarations}}/g, declarations);
  fs.writeFileSync(path.join(docsPath, `index.module.ts`), module);
}
