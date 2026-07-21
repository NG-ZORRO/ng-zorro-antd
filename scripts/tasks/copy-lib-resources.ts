/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync } from 'fs-extra';

import { join } from 'path';

import { buildConfig } from '../build-config';

// Copies the README.md file to the publish directory (gulp `library:copy-resources`).
copySync(join(buildConfig.projectDir, 'README.md'), join(buildConfig.publishDir, 'README.md'));
