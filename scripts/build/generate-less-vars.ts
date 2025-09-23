/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { writeFileSync } from 'fs-extra';

import path from 'path';

import { buildConfig } from '../build-config';
import { compactPaletteLess } from './compact-vars';
import { darkPaletteLess } from './dark-vars';

export function generateLessVars(): void {
  const dist = buildConfig.publishDir;
  writeFileSync(path.join(dist, 'dark-theme.js'), `module.exports = ${JSON.stringify(darkPaletteLess)}`, 'utf8');
  writeFileSync(path.join(dist, 'compact-theme.js'), `module.exports = ${JSON.stringify(compactPaletteLess)}`, 'utf8');
}
