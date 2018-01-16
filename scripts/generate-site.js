const fs = require('fs');
const path = require('path');
const wrench = require('wrench');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const getMeta = require('./utils/get-meta');
const status = process.argv[2] || 'sync';

// 创建site文件夹
const showCasePath = path.resolve(__dirname, '../site');

if (status === 'init') {
  wrench.rmdirSyncRecursive(`${showCasePath}`, true);
  wrench.copyDirSyncRecursive(path.resolve(__dirname, '_site'), `${showCasePath}`);
} else {
  wrench.rmdirSyncRecursive(`${showCasePath}/src`, true);
  wrench.copyDirSyncRecursive(path.resolve(__dirname, '_site/src'), `${showCasePath}/src`);
  wrench.rmdirSyncRecursive(`${showCasePath}/node_modules/ng-zorro-antd`, true);
  wrench.copyDirSyncRecursive(path.resolve(__dirname, '../components'), `${showCasePath}/node_modules/ng-zorro-antd`);
}

const showCaseTargetPath = `${showCasePath}/src/app/`;
// 读取components文件夹
const rootPath = path.resolve(__dirname, '../components');
const rootDir = fs.readdirSync(rootPath);
const componentsMap = {};
rootDir.forEach(componentName => {
  const componentDirPath = path.join(rootPath, componentName);
  if (componentName === 'style' || componentName === 'core' || componentName === 'locale') {
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
          demoMap[nameKey]['enCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["en-US"], demoMap[nameKey].en);
          demoMap[nameKey]['zhCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["zh-CN"], demoMap[nameKey].zh);
        }
        if (/.ts$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
          // 复制ts文件到site->${component}文件夹
          fs.writeFileSync(path.join(showCaseComponentPath, demo), demoMap[nameKey].ts);
        }
      });
    }
    // 处理components->${component}->doc文件夹
    const result = {
      name   : componentName,
      docZh  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `components/${componentName}/doc/index.zh-CN.md`),
      docEn  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `components/${componentName}/doc/index.en-US.md`),
      demoMap: demoMap
    };
    componentsMap[componentName] = result.docZh.meta;

    generateDemo(showCaseComponentPath, result);
  }
});

// 读取docs文件夹
const docsPath = path.resolve(__dirname, '../docs');
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