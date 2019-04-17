const path = require('path');
const fs = require('fs');
const templateRouter = String(fs.readFileSync(path.resolve(__dirname, '../template/router.template.ts')));
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

function generateLanguageData(itemData, language, reverseMap, key) {
  const subtitle = itemData[language].subtitle || '';
  const title = itemData[language].title;
  const type = itemData[language].type;
  const content = {
    label: title,
    path : `components/${key}/${language}`,
    zh   : subtitle
  };
  if (!reverseMap[type]) {
    reverseMap[type] = { list: [content], language };
  } else {
    reverseMap[type].list.push(content);
  }
}

function generateNav(componentsDocMap) {
  const reverseMap = {};
  let routes = '';
  for (const key in componentsDocMap) {
    generateLanguageData(componentsDocMap[key], 'zh', reverseMap, key);
    generateLanguageData(componentsDocMap[key], 'en', reverseMap, key);
    const moduleName = capitalizeFirstLetter(camelCase(key));
    routes += `  {'path': 'components/${key}', 'loadChildren': './${key}/index.module#NzDemo${moduleName}Module'},\n`;
  }
  return { reverseMap, routes };
}

module.exports = function generateRoutes(showCaseTargetPath, componentsDocMap, docsMeta) {
  let intro = [];
  let components = [];
  for (const key in docsMeta) {
    intro.push({
      path    : `docs/${key}/en`,
      label   : docsMeta[key].en.title,
      language: 'en',
      order   : docsMeta[key].en.order
    });
    intro.push({
      path    : `docs/${key}/zh`,
      label   : docsMeta[key].zh.title,
      language: 'zh',
      order   : docsMeta[key].zh.order
    });
  }
  intro.sort((pre, next) => pre.order - next.order);
  fs.writeFileSync(path.join(showCaseTargetPath, `intros.json`), JSON.stringify(intro, null, 2));
  const navData = generateNav(componentsDocMap);
  const routes = navData.routes;
  for (const key in navData.reverseMap) {
    components.push({
      name    : key,
      language: navData.reverseMap[key].language,
      children: navData.reverseMap[key].list
    });
  }

  const sortMap = {
    General       : 0,
    '通用'          : 0,
    Layout        : 1,
    '布局'          : 1,
    Navigation    : 2,
    '导航'          : 2,
    'Data Entry'  : 3,
    '数据录入'        : 3,
    'Data Display': 4,
    '数据展示'        : 4,
    Feedback      : 5,
    '反馈'          : 5,
    Localization  : 6,
    Other         : 7,
    '其他'          : 7
  };
  components.sort((pre, next) => {
    return sortMap[pre.name] - sortMap[next.name];
  });
  const fileContent = templateRouter.replace(/{{intro}}/g, JSON.stringify(intro, null, 2)).replace(/{{components}}/g, JSON.stringify(components, null, 2)).replace(/{{routes}}/g, routes);
  fs.writeFileSync(path.join(showCaseTargetPath, `router.ts`), fileContent);

};