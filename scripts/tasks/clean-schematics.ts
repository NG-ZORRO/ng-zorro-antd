/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { removeSync } from 'fs-extra';

import { join } from 'path';

import { buildConfig } from '../build-config';

// Deletes the generated schematics/demo directory and utils/version-names.ts file (gulp `clean:schematics`).
removeSync(join(buildConfig.projectDir, 'schematics/demo'));
removeSync(join(buildConfig.projectDir, 'schematics/utils/version-names.ts'));
