/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { buildConfig } from '../build-config';

const path = require('path');
const fs = require('fs-extra');

export function setVersion(): void {
  fs.outputFileSync(
    path.join(buildConfig.projectDir, `schematics/utils/version-names.ts`),
    `
export const zorroVersion = '^${buildConfig.projectVersion}';
export const hammerjsVersion = '^2.0.8';
`);
}
