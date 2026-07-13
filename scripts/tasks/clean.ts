/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { removeSync } from 'fs-extra';

import { buildConfig } from '../build-config';

// Deletes the dist/ and publish/ directories (gulp `clean`).
removeSync(buildConfig.outputDir);
removeSync(buildConfig.publishDir);
