const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const path = require('path');
const fs = require('fs-extra');
const darkTheme = require('../../components/dark-theme');
const themePath = path.join(__dirname, '../../site/doc/styles.less');
const colorPalettePath = path.join(__dirname, '../../components/style/color/colorPalette.less');
const darkContent = `
@import '${themePath}';
`;

function generateTheme() {
  return less.render(darkContent, {
    javascriptEnabled: true,
    plugins: [new LessPluginCleanCSS({ advanced: true })],
    modifyVars: {
      'hack': `true;@import '${colorPalettePath}';`,
      ...darkTheme,
      '@site-markdown-code-bg': '@input-bg',
      '@site-api-table-first-color': '@green-7',
      '@light': '#fff', '@tabs-horizontal-padding': '12px 0',
      // zIndex': 'notification > popover > tooltip
      '@zindex-notification': '1063', '@zindex-popover': '1061', '@zindex-tooltip': '1060',
      // width
      '@anchor-border-width': '1px',
      // margin
      '@form-item-margin-bottom': '24px', '@menu-item-vertical-margin': '0px', '@menu-item-boundary-margin': '0px',
      // size
      '@font-size-base': '14px', '@font-size-lg': '16px', '@screen-xl': '1208px', '@screen-lg': '1024px', '@screen-md': '768px',
      // 移动
      '@screen-sm': '767.9px',
      // 超小屏
      '@screen-xs': '375px',
      // 官网
      '@site-text-color': '@text-color', '@site-border-color-split': 'fade(@light, 5)', '@site-heading-color': '@heading-color', '@site-header-box-shadow': '0 0.3px 0.9px rgba(0, 0, 0, 0.12), 0 1.6px 3.6px rgba(0, 0, 0, 0.12)', '@home-text-color': '@text-color',
      //自定义需要找设计师
      '@gray-8': '@text-color', '@background-color-base': '#555', '@skeleton-color': 'rgba(0,0,0,0.8)',
      // pro
      '@pro-header-box-shadow': '@site-header-box-shadow'
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