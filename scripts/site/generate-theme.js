const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const path = require('path');
const fs = require('fs-extra');
const { darkPaletteLess } = require('../build/dark-vars');
const { compactPaletteLess } = require('../build/compact-vars');
const themePath = path.join(__dirname, '../../site/doc/styles.less');
const colorPalettePath = path.join(__dirname, '../../components/style/color/colorPalette.less');
const themeContent = `
@import '${themePath}';
`;

function generateTheme(vars, fileName) {

  return less.render(themeContent, {
    javascriptEnabled: true,
    plugins: [new LessPluginCleanCSS({ advanced: true })],
    modifyVars: {
      'hack': `true;@import '${colorPalettePath}';`,
      ...vars,
      '@site-markdown-code-bg': '@input-bg',
      '@site-text-color': '@heading-color'
    }
  }).then(data => {
    return fs.writeFile(path.join(__dirname, `../../site/doc/assets/${fileName}`), data.css);
  }).catch(e => {
    console.log(e);
  });
}

function generateAllTheme() {
  return generateTheme(compactPaletteLess, 'compact.css')
    .then(() => generateTheme(darkPaletteLess, 'dark.css'));
}

if (require.main === module) {
  generateAllTheme().then();
}

module.exports = () => generateAllTheme();