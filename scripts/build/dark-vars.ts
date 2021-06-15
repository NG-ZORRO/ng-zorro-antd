/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as fs from 'fs-extra';

import * as path from 'path';

import { buildConfig } from '../build-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lessToJs = require('less-vars-to-js') as any;

const stylePath = path.join(buildConfig.componentsDir, 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const darkLess = fs.readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

export const darkPaletteLess = lessToJs(`${colorLess}${defaultLess}${darkLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
