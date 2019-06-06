const fs = require('fs');
const path = require('path');

const template = String(fs.readFileSync(path.resolve(__dirname, '../template/title.template.html')));

module.exports = function generateTitle(meta, path) {
  return template
    .replace(/{{title}}/g, meta.title)
    .replace(/{{subtitle}}/g, meta.subtitle || '')
    .replace(/{{widget}}/g, meta.widget || '')
    .replace(/{{path}}/g, path);
};
