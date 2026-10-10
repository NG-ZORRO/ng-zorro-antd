/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, removeSync } from 'fs-extra';

import { join } from 'path';

import { buildConfig } from '../build-config';

// Copies the compiled schematics (dist/schematics) into the publish directory.
removeSync(join(buildConfig.publishDir, 'schematics'));
copySync(join(buildConfig.outputDir, 'schematics'), join(buildConfig.publishDir, 'schematics'));
