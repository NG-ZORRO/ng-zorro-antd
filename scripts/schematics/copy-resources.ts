/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync } from 'fs-extra';

import path from 'path';

import { buildConfig } from '../build-config';

const srcPath = path.join(buildConfig.projectDir, `schematics`);
const targetPath = path.join(buildConfig.outputDir, `schematics`);
const copyFilter = (p: string): boolean =>
  !/schematics(\/|\\)demo(?:\/|\\|$)/.test(p) &&
  !/schematics(\/|\\)project\.json$/.test(p) &&
  (/files(\/|\\)__path__/.test(p) || !/.+\.ts/.test(p) || /.template$/.test(p));

export function copyResources(): void {
  copySync(srcPath, targetPath, { filter: copyFilter });
}
