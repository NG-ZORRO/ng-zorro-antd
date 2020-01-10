const fs = require('fs');
const path = require('path');
const camelCase = require('./camelcase');
const template = String(fs.readFileSync(path.resolve(__dirname, '../template/code-box.template.html')));

module.exports = function generateCodeBox(component, demoName, key, title, doc, iframe) {
  let output = template;
  output = output.replace(/{{title}}/g, title);
  output = output.replace(/{{component}}/g, component);
  output = output.replace(/{{componentName}}/g, demoName);
  output = output.replace(/{{key}}/g, key);
  output = output.replace(/{{doc}}/g, doc);
  if (iframe) {
    if (iframe.source) {
      output = output.replace(/{{iframeSource}}/g, iframe.source);
    } else {
      output = output.replace(/{{iframeSource}}/g, `/iframe/#/${component}-${key}`);
    }
    if (iframe.height) {
      output = output.replace(/{{iframeHeight}}/g, iframe.height);
    } else {
      output = output.replace(/{{iframeHeight}}/g, null);
    }
  } else {
    output = output.replace(/{{iframeSource}}/g, null);
    output = output.replace(/{{iframeHeight}}/g, null);
  }
  output = output.replace(/{{code}}/g, camelCase(key));
  output = output.replace(/{{rawCode}}/g, `${camelCase(key)}Raw`);
  output = output.replace(/{{nzGenerateCommand}}/g, `ng g ng-zorro-antd:${component}-${key} <name>`);
  return output;
};
