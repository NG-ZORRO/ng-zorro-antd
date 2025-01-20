/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { buildConfig } from '../../build-config';
import { cleanTask } from '../utils/task-helpers';

/** Deletes the dist/ publish/ directory. */
export async function clean(): Promise<string[]> {
  return cleanTask([buildConfig.outputDir, buildConfig.publishDir]);
}
