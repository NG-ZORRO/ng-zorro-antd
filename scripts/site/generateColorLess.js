#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../../site/doc/'),
  antdStylesDir: path.join(__dirname, '../../components'),
  varFile: path.join(__dirname, '../../components/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../../site/doc/styles.less'),
  themeVariables: [
    '@primary-color',
  ],
  outputFilePath: path.join(__dirname, '../../site/doc/assets/color.less'),
};

if (require.main === module) {
  generateTheme(options);
}

module.exports = () => generateTheme(options);