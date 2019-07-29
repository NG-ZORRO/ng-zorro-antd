const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const generateIframe = require('./utils/generate-iframe');
const capitalizeFirstLetter = require('./utils/capitalize-first-letter');
const camelCase = require('./utils/camelcase');
const getMeta = require('./utils/get-meta');
const arg = process.argv[2];
// create site folder
const showCasePath = path.resolve(__dirname, '../../site');

function getFileFromDemo(rootPath, callback) {
  const rootDir = fs.readdirSync(rootPath);
  for (const componentName of rootDir) {
    const demoPath = path.join(rootPath, componentName, 'demo');
    if (fs.existsSync(demoPath)) {
      const demoDir = fs.readdirSync(demoPath);
      for (const currentDemoPath of demoDir) {
        const nameKey = nameWithoutSuffixUtil(currentDemoPath);
        if (callback && callback({ nameKey, currentDemoPath, demoPath, componentName })) {
          break;
        }
      }
    }
  }
}

function isOnlyMode(rootPath) {
  const result = { status: false, onlyNameKey: '', onlyComponentName: '' };
  getFileFromDemo(rootPath, ({ nameKey, currentDemoPath, demoPath, componentName }) => {
    if (/.md$/.test(currentDemoPath)) {
      const demoMarkDownFile = fs.readFileSync(path.join(demoPath, currentDemoPath));
      if (parseDemoMdUtil(demoMarkDownFile).meta['only']) {
        result.onlyNameKey = nameKey;
        result.onlyComponentName = componentName;
        result.status = true;
        return true;
      }
    }
    return false;
  });
  return result;
}

function handleWithDemoMap({ currentDemoPath, componentName, nameKey, showCaseComponentPath }) {
  const demoDir = fs.readdirSync(currentDemoPath);
  const demoMap = {};
  fs.mkdirSync(showCaseComponentPath);
  demoDir.map(filePath => {
    if (/.md$/.test(filePath)) {
      const demoMarkDownFile = fs.readFileSync(path.join(currentDemoPath, filePath));
      demoMap[nameKey] = parseDemoMdUtil(demoMarkDownFile)
      demoMap[nameKey]['name'] = `NzDemo${camelCase(capitalizeFirstLetter(componentName))}${camelCase(capitalizeFirstLetter(nameKey))}Component`;
      demoMap[nameKey]['enCode'] = generateCodeBox(componentName, demoMap[nameKey]['name'], nameKey, demoMap[nameKey].meta.title['en-US'], demoMap[nameKey].en, demoMap[nameKey].meta.iframe);
      demoMap[nameKey]['zhCode'] = generateCodeBox(componentName, demoMap[nameKey]['name'], nameKey, demoMap[nameKey].meta.title['zh-CN'], demoMap[nameKey].zh, demoMap[nameKey].meta.iframe);
    }
    if (/.ts$/.test(filePath)) {
      demoMap[nameKey].ts = String(fs.readFileSync(path.join(currentDemoPath, filePath)));
      // copy ts file to site->${component} folder
      fs.writeFileSync(path.join(showCaseComponentPath, filePath), demoMap[nameKey].ts);
    }
    if (filePath === 'module') {
      const data = String(fs.readFileSync(path.join(currentDemoPath, filePath)));
      fs.writeFileSync(path.join(showCaseComponentPath, 'module.ts'), data);
    }
  });
  return demoMap;
}

// handle components->${component}->page folder, parent component of demo page
function handleWithPageDemo({ componentDirPath }) {
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
  return pageDemo;
}

function generate(target) {
  const isSyncSpecific = target && (target !== 'init');
  if (!target) {
    fs.removeSync(`${showCasePath}/doc`);
    fs.copySync(path.resolve(__dirname, '_site/doc'), `${showCasePath}/doc`);
  } else if (target === 'init') {
    fs.removeSync(`${showCasePath}`);
    fs.copySync(path.resolve(__dirname, '_site'), `${showCasePath}`);
  } else {
    fs.removeSync(`${showCasePath}/doc/app/${target}`);
  }
  const showCaseTargetPath = `${showCasePath}/doc/app/`;
  const iframeTargetPath = `${showCasePath}/iframe/app/`;
// read components folder
  const rootPath = path.resolve(__dirname, '../../components');
  const rootDir = fs.readdirSync(rootPath);
  let { status, onlyComponentName, onlyNameKey } = isOnlyMode(rootPath);
  const componentsDocMap = {};
  let componentsMap = {};
  let pageDemo = '';
  let demoMap = {};

  if (status) {
    const showCaseComponentPath = path.join(showCaseTargetPath, onlyComponentName);
    const componentDirPath = path.join(rootPath, onlyComponentName);
    pageDemo = handleWithPageDemo({ componentDirPath });
    demoMap = handleWithDemoMap({ currentDemoPath: path.join(componentDirPath, 'demo'), componentName: onlyComponentName, nameKey: onlyNameKey, showCaseComponentPath });
    componentsMap = { [onlyComponentName]: demoMap };
    const docZh = parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `components/${onlyComponentName}/doc/index.zh-CN.md`);
    const docEn = parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `components/${onlyComponentName}/doc/index.en-US.md`);
    generateDemo(path.join(showCaseTargetPath, onlyComponentName), {
      name: onlyComponentName,
      docZh,
      docEn,
      demoMap,
      pageDemo,
    });
    componentsDocMap[onlyComponentName] = { zh: docZh.meta, en: docEn.meta };
  } else {

  }

  // rootDir.forEach(componentName => {
  //   if (isSyncSpecific) {
  //     if (componentName !== target) {
  //       return;
  //     }
  //   }
  //   const componentDirPath = path.join(rootPath, componentName);
  //   if (componentName === 'style' || componentName === 'core' || componentName === 'locale' || componentName === 'i18n' || componentName === 'version') {
  //     return;
  //   }
  //   if (fs.statSync(componentDirPath).isDirectory()) {
  //     // create site/doc/app->${component} folder
  //     const showCaseComponentPath = path.join(showCaseTargetPath, status ? onlyComponentName : componentName);
  //     fs.mkdirSync(showCaseComponentPath);
  //     // let { demoMap, pageDemo } = prepareForGenerateDemo({ componentDirPath: onlyComponentName, rootDir: rootPath, showCaseComponentPath });
  //     const pageDemo = handleWithPageDemo({ componentDirPath });
  //     let demoMap = handleWithDemoMap();

  //     if (status) {
  //       demoMap = demoMap[onlyNameKey];
  //       componentsMap = { [onlyComponentName]: { [onlyNameKey]: demoMap } };
  //       generateDemo(path.join(showCaseTargetPath, onlyComponentName), {
  //         name: onlyComponentName,
  //         docZh: parseDocMdUtil(fs.readFileSync(path.join(rootPath, onlyComponentName, 'doc/index.zh-CN.md')), `components/${onlyComponentName}/doc/index.zh-CN.md`),
  //         docEn: parseDocMdUtil(fs.readFileSync(path.join(rootPath, onlyComponentName, 'doc/index.en-US.md')), `components/${onlyComponentName}/doc/index.en-US.md`),
  //         demoMap: { [onlyNameKey]: demoMap },
  //       });
  //     } else {
  //       // handle components->${component}->doc folder
  //       const result = {
  //         name: componentName,
  //         docZh: parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `components/${componentName}/doc/index.zh-CN.md`),
  //         docEn: parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `components/${componentName}/doc/index.en-US.md`),
  //         demoMap,
  //         pageDemo
  //       };
  //       componentsDocMap[componentName] = { zh: result.docZh.meta, en: result.docEn.meta };
  //       componentsMap[componentName] = demoMap;
  //       generateDemo(showCaseComponentPath, result);
  //     }
  //   }
  // });

// handle iframe folder
  generateIframe(iframeTargetPath, componentsMap);

  if (!isSyncSpecific) {
    // read docs folder
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
      };
    });

    generateDocs(showCaseTargetPath, docsMap);
    generateRoutes(showCaseTargetPath, componentsDocMap, docsMeta);
  }
}

if (require.main === module) {
  generate(arg);
}

module.exports = generate;