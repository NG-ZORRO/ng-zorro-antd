/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, emptyDirSync } from 'fs-extra';

import { buildConfig } from '../build-config';

// Copies files without ngcc to the lib folder (gulp `library:copy-libs`).
// Remove stale artifacts, including demo generators from before the package split.
emptyDirSync(buildConfig.libDir);
copySync(buildConfig.publishDir, buildConfig.libDir);
