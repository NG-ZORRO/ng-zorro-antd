import * as fs from 'fs-extra';
import * as path from 'path';
import { buildConfig } from '../build-config';

// tslint:disable-next-line:no-any
const lessToJs = require('less-vars-to-js') as any;

const stylePath = path.join(buildConfig.componentsDir, 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const darkLess = fs.readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

export const darkPaletteLess = lessToJs(`${colorLess}${defaultLess}${darkLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
