const fs = require('fs');
const path = require('path');

const template = String(fs.readFileSync(path.resolve(__dirname, '../template/title.template.html')));

module.exports = function generateTitle(title, subtitle, path) {
  return template.replace(/{{title}}/g, title).replace(/{{subtitle}}/g, subtitle).replace(/{{path}}/g, path);
};
