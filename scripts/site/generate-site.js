const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDemoCodeFiles = require('./utils/generate-demo-code-files');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const capitalizeFirstLetter = require('./utils/capitalize-first-letter');
const camelCase = require('./utils/camelcase');
const getMeta = require('./utils/get-meta');
const arg = process.argv[2];
// create site folder
const showCasePath = path.resolve(__dirname, '../../site');

function generate(target) {
  const isSyncSpecific = target && target !== 'init';
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
  // read components folder
  const rootPath = path.resolve(__dirname, '../../components');
  const rootDir = fs.readdirSync(rootPath);
  /** @type {ComponentIndexDocMap} */
  const componentsDocMap = {};
  /** @type {Record.<string, Record.<string, ComponentDemoDoc>>} */
  const componentsMap = {};
  rootDir.forEach(componentName => {
    if (isSyncSpecific) {
      if (componentName !== target) {
        return;
      }
    }
    const componentDirPath = path.join(rootPath, componentName);
    const skips = ['style', 'core', 'locale', 'cdk', 'i18n', 'version', 'experimental'];
    if (skips.indexOf(componentName) !== -1) {
      return;
    }
    if (fs.statSync(componentDirPath).isDirectory()) {
      // create site/doc/app->${component} folder
      const showCaseComponentPath = path.join(showCaseTargetPath, componentName);
      fs.mkdirSync(showCaseComponentPath);

      // handle components->${component}->demo folder
      const demoDirPath = path.join(componentDirPath, 'demo');
      /** @type {Record.<string, ComponentDemoDoc>} */
      const demoMap = {};
      const debugDemos = new Set();

      if (fs.existsSync(demoDirPath)) {
        const demoDir = fs.readdirSync(demoDirPath);
        demoDir.forEach(demo => {
          if (/.md$/.test(demo)) {
            const nameKey = nameWithoutSuffixUtil(demo);
            const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demo));
            const demoMeta = parseDemoMdUtil(demoMarkDownFile);

            if (demoMeta.meta.debug && process.env.NODE_ENV !== 'development') {
              debugDemos.add(nameKey);
              return;
            }

            demoMap[nameKey] = demoMeta;
            demoMap[nameKey]['name'] = `NzDemo${camelCase(capitalizeFirstLetter(componentName))}${camelCase(
              capitalizeFirstLetter(nameKey)
            )}Component`;
            demoMap[nameKey]['enCode'] = generateCodeBox(
              componentName,
              demoMap[nameKey]['name'],
              nameKey,
              demoMap[nameKey].meta.title['en-US'],
              demoMap[nameKey].en,
              demoMap[nameKey].meta.iframe
            );
            demoMap[nameKey]['zhCode'] = generateCodeBox(
              componentName,
              demoMap[nameKey]['name'],
              nameKey,
              demoMap[nameKey].meta.title['zh-CN'],
              demoMap[nameKey].zh,
              demoMap[nameKey].meta.iframe
            );
          }

          if (/.ts$/.test(demo)) {
            const nameKey = nameWithoutSuffixUtil(demo);
            if (debugDemos.has(nameKey)) {
              return;
            }

            demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
            // copy ts file to site->${component} folder
            fs.writeFileSync(path.join(showCaseComponentPath, demo), demoMap[nameKey].ts);
          }

          if (demo === 'module') {
            const data = String(fs.readFileSync(path.join(demoDirPath, demo)));
            fs.writeFileSync(path.join(showCaseComponentPath, 'module.ts'), data);
          }
        });
      }

      /**
       * @typedef ComponentDemoPage
       * @type {object}
       * @property {string} raw - raw content of demo page
       * @property {string} zhCode - chinese code content
       * @property {string} enCode - english code content
       */
      // handle components->${component}->page folder, parent component of demo page
      /** @type {ComponentDemoPage} */
      let pageDemo;
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

      /**
       *  @typedef ComponentDemo
       *  @type {object}
       *  @property {string} name - demo name
       *  @property {ComponentIndexDoc} docZh - chinese doc content metadata
       *  @property {ComponentIndexDoc} docEn - english doc content
       *  @property {Record.<string, ComponentDemoDoc>} demoMap - demo content
       *  @property {ComponentDemoPage} pageDemo - demo page content
       *  @property {boolean} [standalone] - standalone mode
       */

      // handle components->${component}->doc folder
      /** @type ComponentDemo */
      const result = {
        name: componentName,
        docZh: parseDocMdUtil(
          fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')),
          `components/${componentName}/doc/index.zh-CN.md`
        ),
        docEn: parseDocMdUtil(
          fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')),
          `components/${componentName}/doc/index.en-US.md`
        ),
        standalone: !fs.existsSync(path.join(componentDirPath, 'demo/module')),
        demoMap,
        pageDemo
      };
      componentsDocMap[componentName] = {
        zh: result.docZh.meta,
        en: result.docEn.meta,
        standalone: result.standalone
      };
      componentsMap[componentName] = demoMap;
      generateDemo(showCaseComponentPath, result);
      generateDemoCodeFiles(result, showCasePath);
    }
  });

  if (!isSyncSpecific) {
    // read docs folder
    const docsPath = path.resolve(__dirname, '../../docs');
    const docsDir = fs.readdirSync(docsPath);
    /** @type {Record.<string, {zh: Buffer, en: Buffer}>} */
    let docsMap = {};
    /** @type {ComponentIndexDocMap} */
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
