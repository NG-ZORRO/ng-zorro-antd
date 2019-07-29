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

function handleWithDemoMap({ demoPaths, componentName, nameKey: originNameKey, showCaseComponentPath }) {
  const demoMap = {};
  demoPaths.map(currentDemoPath => {
    const demoDir = fs.readdirSync(currentDemoPath);
    fs.ensureDirSync(showCaseComponentPath);
    let nameKey = originNameKey;
    demoDir.map(filePath => {
      if (path.basename(currentDemoPath.replace('demo', '')) !== componentName) {
        return;
      }
      if (!originNameKey) {
        nameKey = nameWithoutSuffixUtil(filePath);
      }
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

function switchGenerateDemo({ componentName, componentDirPath, demoMap, showCaseTargetPath, pageDemo }) {
  const docZh = parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `components/${componentName}/doc/index.zh-CN.md`);
  const docEn = parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `components/${componentName}/doc/index.en-US.md`);
  generateDemo(path.join(showCaseTargetPath, componentName), {
    name: componentName,
    docZh,
    docEn,
    demoMap,
    pageDemo,
  });
  return { docZh, docEn };
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
  let { status, onlyComponentName, onlyNameKey } = isOnlyMode(rootPath);
  const componentsDocMap = {};
  let componentsMap = {};
  let demoMap = {};

  if (status) {
    const componentDirPath = path.join(rootPath, onlyComponentName);
    const pageDemo = handleWithPageDemo({ componentDirPath });;
    const showCaseComponentPath = path.join(showCaseTargetPath, onlyComponentName);
    demoMap = handleWithDemoMap({ demoPaths: [path.join(componentDirPath, 'demo')], componentName: onlyComponentName, nameKey: onlyNameKey, showCaseComponentPath });
    componentsMap = { [onlyComponentName]: demoMap };
    const { docZh, docEn } = switchGenerateDemo({ componentName: onlyComponentName, componentDirPath, demoMap, showCaseTargetPath, pageDemo, componentsDocMap });
    componentsDocMap[onlyComponentName] = { zh: docZh.meta, en: docEn.meta };
  } else {
    const rootDir = fs.readdirSync(rootPath).filter(componentName => componentName !== 'style' && componentName !== 'core' && componentName !== 'locale' && componentName !== 'i18n' && componentName !== 'version').filter(componentName => fs.statSync(path.join(rootPath, componentName)).isDirectory());
    const demoPaths = [];
    rootDir.map(componentName => {
      if (fs.statSync(path.join(rootPath, componentName)).isDirectory()) {
        demoPaths.push(path.join(rootPath, componentName, 'demo'));
      }
    });
    rootDir.forEach(componentName => {
      const componentDirPath = path.join(rootPath, componentName);
      const pageDemo = handleWithPageDemo({ componentDirPath });
      const showCaseComponentPath = path.join(showCaseTargetPath, componentName);
      demoMap = handleWithDemoMap({ demoPaths, componentName, showCaseComponentPath });
      componentsMap[componentName] = demoMap;
      const { docZh, docEn } = switchGenerateDemo({ componentName, componentDirPath, demoMap, showCaseTargetPath, pageDemo, componentsDocMap });
      componentsDocMap[componentName] = { zh: docZh.meta, en: docEn.meta };
    });
  }

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