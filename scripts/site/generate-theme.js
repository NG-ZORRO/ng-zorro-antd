const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const path = require('path');
const fs = require('fs-extra');
const darkTheme = require('@ant-design/dark-theme');
const themePath = path.join(__dirname, '../../site/doc/styles.less');

const darkContent = `
@import '${themePath}';
`;

function generateTheme() {
  return less.render(darkContent, {
    javascriptEnabled: true,
    plugins: [new LessPluginCleanCSS({ advanced: true })],
    modifyVars: {
      ...darkTheme.default,
      '@site-markdown-code-bg': '@input-bg',
      '@site-api-table-first-color': '@green-7',
    }
  }).then(data => {
    fs.writeFileSync(path.join(__dirname, '../../site/doc/assets/dark.css'), data.css);
  }).catch(e => {
    console.log(e);
  });
}

if (require.main === module) {
  generateTheme()
}

module.exports = () => generateTheme();