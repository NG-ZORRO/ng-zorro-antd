const path = require('path');
const fs = require('fs-extra');
const prism = require('./prism');

module.exports = function generateDemoCodeFiles(content, sitePath) {
  const lang = 'angular';
  const demoMap = content.demoMap;
  for (const key in demoMap) {
    const rawCode = demoMap[key].ts;
    const highlightCode = prism.highlight(rawCode, prism.languages[lang], lang);
    const targetPath = path.join(sitePath, 'doc/assets/codes', `${content.name}-demo-${key}.json`);

    fs.ensureFileSync(targetPath);
    fs.writeJSONSync(
      targetPath,
      {
        highlightCode,
        rawCode
      },
      {}
    );
  }
};
