/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { task } from 'gulp';

import { buildConfig } from '../../build-config';
import { cleanTask } from '../util/task-helpers';

/** Deletes the dist/ publish/ directory. */
task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir]));
