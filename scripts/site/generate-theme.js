const less = require('less');
const path = require('path');
const fs = require('fs-extra');
const darkTheme = require('@ant-design/dark-theme');

const themePath = path.join(__dirname, '../../site/doc/styles.less');

const lightContent = `
html.light {
  @import '${themePath}';
}
`;

const darkContent = `
@import '${themePath}';
`;



less.render(lightContent, {
  javascriptEnabled: true
}).then(data => {
  fs.writeFileSync(path.join(__dirname, '../../site/doc/light.css'), data.css);
}).catch(e => {
  console.log(e);
});
less.render(darkContent, {
  javascriptEnabled: true,
  modifyVars: darkTheme.default
}).then(data => {
  fs.writeFileSync(path.join(__dirname, '../../site/doc/dark.css'), data.css);
}).catch(e => {
  console.log(e);
});