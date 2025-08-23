const { parse } = require('./marked');
const getMeta = require('./get-meta');
const angularNonBindAble = require('./angular-nonbindable');
const fs = require('fs');
const path = require('path');
const generateTitle = require('./generate.title');
const componentTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/doc-component.template.ts')));
const routesTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/doc-routes.template.ts')));
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

/**
 * Generate docs in `/docs` folder
 * @param {string} rootPath
 * @param {Record.<string, {zh: Buffer, en: Buffer}>} docsMap
 */
module.exports = function generateDocs(rootPath, docsMap) {
  const docsPath = `${rootPath}docs`;
  fs.mkdirSync(docsPath);

  for (const name in docsMap) {
    generateDoc(docsMap[name].zh, docsPath, name, 'zh');
    generateDoc(docsMap[name].en, docsPath, name, 'en');
  }

  generateModule(docsPath, docsMap);
};

/**
 * @param {Buffer} file
 * @param {string} docsPath
 * @param {string} name
 * @param {'zh'|'en'} language
 */
function generateDoc(file, docsPath, name, language) {
  const filePath = `docs/${name}.${language === 'en' ? 'en-US' : 'zh-CN'}.md`;
  const meta = getMeta(file);
  const raw = meta.__content;
  delete meta.__content;
  const content = parse(raw, { async: false });

  // template.html
  fs.writeFileSync(
    path.join(docsPath, `${name}-${language}.html`),
    wrapperDocs(generateToc(meta, raw), generateTitle(meta, filePath), angularNonBindAble(content))
  );
  // component.ts
  const component = componentTemplate
    .replace(/{{component}}/g, name)
    .replace(/{{language}}/g, language)
    .replace(/{{componentName}}/g, `${capitalizeFirstLetter(camelCase(name))}${capitalizeFirstLetter(language)}`);
  fs.writeFileSync(path.join(docsPath, `${name}-${language}.ts`), component);
}

function wrapperDocs(toc, title, content) {
  return `<article class="markdown">
  ${title}${toc}
  <section class="markdown" ngNonBindable>${content}</section>
</article>`;
}

function generateToc(meta, raw) {
  if (meta.timeline) return '';
  const { remark } = require('remark');
  const ast = remark.parse(raw);
  let links = '';
  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    if (child.type === 'heading' && child.depth === 2) {
      const text = child.children[0].value;
      const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '');
      links += `<nz-link nzHref="#${lowerText}" nzTitle="${text}"></nz-link>`;
    }
  }
  return `
<nz-affix class="toc-affix" [nzOffsetTop]="16">
  <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
    ${links}
  </nz-anchor>
</nz-affix>`;
}

function generateModule(docsPath, docsMap) {
  let imports = '';
  let router = '';
  for (const name in docsMap) {
    const componentName = `NzDoc${capitalizeFirstLetter(camelCase(name))}`;
    const enComponentName = `${componentName}EnComponent`;
    const zhComponentName = `${componentName}ZhComponent`;
    imports += `import { ${enComponentName} } from './${name}-en';\n`;
    imports += `import { ${zhComponentName} } from './${name}-zh';\n`;
    router += `\t{ path: '${name}/zh', component: ${zhComponentName} },\n`;
    router += `\t{ path: '${name}/en', component: ${enComponentName} },\n`;
  }
  const module = routesTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{routes}}/g, router);
  fs.writeFileSync(path.join(docsPath, `routes.ts`), module);
}
