/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as path from 'path';

import * as fs from 'fs-extra';

import { buildConfig } from '../build-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lessToJs = require('less-vars-to-js') as any;

const stylePath = path.join(buildConfig.componentsDir, 'style');
const aliyunLess = fs.readFileSync(path.join(stylePath, 'themes', 'aliyun.less'), 'utf8');

export const aliyunPaletteLess = lessToJs(`${aliyunLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
