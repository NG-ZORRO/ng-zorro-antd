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
const compactLess = fs.readFileSync(path.join(stylePath, 'themes', 'compact.less'), 'utf8');

export const compactPaletteLess = lessToJs(`${compactLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
