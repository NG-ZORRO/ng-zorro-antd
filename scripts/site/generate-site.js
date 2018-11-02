const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const getMeta = require('./utils/get-meta');
const target = process.argv[2];
const isSyncSpecific = target && (target !== 'init');
// 创建site文件夹
const showCasePath = path.resolve(__dirname, '../../site');

if (!target) {
  fs.removeSync(`${showCasePath}/src`);
  fs.copySync(path.resolve(__dirname, '_site/src'), `${showCasePath}/src`);
} else if (target === 'init') {
  fs.removeSync(`${showCasePath}`);
  fs.copySync(path.resolve(__dirname, '_site'), `${showCasePath}`);
} else {
  fs.removeSync(`${showCasePath}/src/app/${target}`);
}
const showCaseTargetPath = `${showCasePath}/src/app/`;
// 读取components文件夹
const rootPath = path.resolve(__dirname, '../../components');
const rootDir = fs.readdirSync(rootPath);
const componentsMap = {};
rootDir.forEach(componentName => {
  if (isSyncSpecific) {
    if (componentName !== target) {
      return;
    }
  }
  const componentDirPath = path.join(rootPath, componentName);
  if (componentName === 'style' || componentName === 'core' || componentName === 'locale' || componentName === 'i18n') {
    return;
  }
  if (fs.statSync(componentDirPath).isDirectory()) {
    // 创建site->${component}文件夹
    const showCaseComponentPath = path.join(showCaseTargetPath, componentName);
    fs.mkdirSync(showCaseComponentPath);

    // 处理components->${component}->demo文件夹
    const demoDirPath = path.join(componentDirPath, 'demo');
    const demoMap = {};
    if (fs.existsSync(demoDirPath)) {
      const demoDir = fs.readdirSync(demoDirPath);
      demoDir.forEach(demo => {

        if (/.md$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demo));
          demoMap[nameKey] = parseDemoMdUtil(demoMarkDownFile);
          demoMap[nameKey]['enCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["en-US"], demoMap[nameKey].en, demoMap[nameKey].meta.iframe);
          demoMap[nameKey]['zhCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["zh-CN"], demoMap[nameKey].zh, demoMap[nameKey].meta.iframe);
        }
        if (/.ts$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
          // 复制ts文件到site->${component}文件夹
          fs.writeFileSync(path.join(showCaseComponentPath, demo), demoMap[nameKey].ts);
        }
      });
    }

    // 处理components->${component}->page文件夹, 这是在代码演示之前的页面级别的 demo
    let pageDemo = '';
    const pageDirPath = path.join(componentDirPath, 'page');
    if (fs.existsSync(pageDirPath)) {
      const pageDir = fs.readdirSync(pageDirPath);
      let zhLocale = '';
      let enLocale = '';
      pageDemo = {};
      pageDir.forEach(file => {
        if (/.ts$/.test(file)) {
          pageDemo.raw = String(fs.readFileSync(path.join(pageDirPath, file)));
        }
        if (/^zh-CN.txt$/.test(file)) {
          zhLocale = String(fs.readFileSync(path.join(pageDirPath, file)));
        }
        if (/^en-US.txt$/.test(file)) {
          enLocale = String(fs.readFileSync(path.join(pageDirPath, file)));
        }
      });
      pageDemo.enCode = pageDemo.raw.replace(/locale;/g, enLocale);
      pageDemo.zhCode = pageDemo.raw.replace(/locale;/g, zhLocale);
    }

    // 处理components->${component}->doc文件夹
    const result = {
      name   : componentName,
      docZh  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `components/${componentName}/doc/index.zh-CN.md`),
      docEn  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `components/${componentName}/doc/index.en-US.md`),
      demoMap,
      pageDemo
    };
    componentsMap[componentName] = result.docZh.meta;

    generateDemo(showCaseComponentPath, result);
  }
});

if (!isSyncSpecific) {
  // 读取docs文件夹
  const docsPath = path.resolve(__dirname, '../../docs');
  const docsDir = fs.readdirSync(docsPath);
  let docsMap = {};
  let docsMeta = {};
  docsDir.forEach(doc => {
    const name = nameWithoutSuffixUtil(doc);
    docsMap[name] = {
      zh: fs.readFileSync(path.join(docsPath, `${name}.zh-CN.md`)),
      en: fs.readFileSync(path.join(docsPath, `${name}.en-US.md`))
    };
    docsMeta[name] = {
      zh: getMeta(docsMap[name].zh),
      en: getMeta(docsMap[name].en)
    }
  });

  generateDocs(showCaseTargetPath, docsMap);
  generateRoutes(showCaseTargetPath, componentsMap, docsMeta);
}


