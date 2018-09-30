#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../../site/src/'),
  antdStylesDir: path.join(__dirname, '../../components'),
  varFile: path.join(__dirname, '../../components/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../../site/src/styles.less'),
  themeVariables: [
    '@primary-color',
  ],
  outputFilePath: path.join(__dirname, '../../site/src/assets/color.less'),
};

generateTheme(options);