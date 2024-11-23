const fs = require('fs-extra');
const path = require('path');
const routesTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/iframe.routes.template.ts')));

module.exports = function (iframeTargetPath, componentsMap) {
  let routes = routesTemplate;
  let importPart = '';
  let routingPart = '';
  for (const key in componentsMap) {
    const demoMap = componentsMap[key];
    for (const innerKey in demoMap) {
      if (demoMap[innerKey].meta.iframe) {
        fs.writeFileSync(path.join(iframeTargetPath, `${key}-${innerKey}.ts`), demoMap[innerKey].ts);
        importPart = `import { ${demoMap[innerKey].name} } from './${key}-${innerKey}';\n${importPart}`;
        routingPart = `  { path: '${key}-${innerKey}', component: ${demoMap[innerKey].name} },\n${routingPart}`;
      }
    }
  }
  routes = routes.replace(/{{imports}}/g, importPart);
  routes = routes.replace(/{{routes}}/g, routingPart);
  fs.writeFileSync(path.join(iframeTargetPath, `app.routes.ts`), routes);
};