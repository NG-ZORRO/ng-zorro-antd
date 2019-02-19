const fs = require('fs-extra');
const path = require('path');
const routingTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/app.routing.module.template.ts')));
const moduleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/app.module.template.ts')));

module.exports = function (iframeTargetPath, componentsMap) {
  let routing = routingTemplate;
  let module = moduleTemplate;
  let importPart = '';
  let routingPart = '';
  let declarationPart = '';
  for (const key in componentsMap) {
    const demoMap = componentsMap[key];
    for (const innerKey in demoMap) {
      if (demoMap[innerKey].meta.iframe) {
        fs.writeFileSync(path.join(iframeTargetPath, `${key}-${innerKey}.ts`), demoMap[innerKey].ts);
        importPart = `import { ${demoMap[innerKey].name} } from './${key}-${innerKey}';\n${importPart}`;
        routingPart = `  { path: '${key}-${innerKey}', component: ${demoMap[innerKey].name} },\n${routingPart}`;
        declarationPart = `    ${demoMap[innerKey].name},\n${declarationPart}`;
      }
    }
  }
  routing = routing.replace(/{{importPart}}/g, importPart);
  routing = routing.replace(/{{routingPart}}/g, routingPart);
  module = module.replace(/{{importPart}}/g, importPart);
  module = module.replace(/{{declarationPart}}/g, declarationPart);
  fs.writeFileSync(path.join(iframeTargetPath, `app.routing.module.ts`), routing);
  fs.writeFileSync(path.join(iframeTargetPath, `app.module.ts`), module);
};