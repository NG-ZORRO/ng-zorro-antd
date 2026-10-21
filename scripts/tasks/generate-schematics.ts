/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { removeSync } from 'fs-extra';

import { join } from 'path';

import { buildConfig } from '../build-config';
import { setVersion } from '../schematics/set-version';

// Clean previous builds, including demo files produced before the package split.
removeSync(join(buildConfig.outputDir, 'schematics'));
removeSync(join(buildConfig.projectDir, 'schematics/demo'));
setVersion();
