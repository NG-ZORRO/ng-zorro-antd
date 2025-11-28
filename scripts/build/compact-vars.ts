/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync } from 'fs-extra';
import lessToJs from 'less-vars-to-js';

import path from 'path';

import { buildConfig } from '../build-config';

const stylePath = path.join(buildConfig.componentsDir, 'style');
const compactLess = readFileSync(path.join(stylePath, 'themes', 'compact.less'), 'utf8');

export const compactPaletteLess = lessToJs(`${compactLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
