/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync } from 'fs-extra';

import { buildConfig } from '../build-config';

// Copies files without ngcc to the lib folder (gulp `library:copy-libs`).
copySync(buildConfig.publishDir, buildConfig.libDir);
