const fs = require('fs');
const path = require('path');
const camelCase = require('./camelcase');

const template = String(fs.readFileSync(path.resolve(__dirname, '../template/code-box.template.html')));

module.exports = function generateCodeBox(component, key, title, doc) {
  let output = template;
  output = output.replace(/{{title}}/g, title);
  output = output.replace(/{{component}}/g, component);
  output = output.replace(/{{key}}/g, key);
  output = output.replace(/{{doc}}/g, doc);
  output = output.replace(/{{code}}/g, camelCase(key));
  return output;
};