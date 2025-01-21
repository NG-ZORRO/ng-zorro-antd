/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { execTask } from '../utils/task-helpers';

export interface TestOptions {
  tags?: string;
  watch?: boolean;
  codeCoverage?: boolean;
}

export async function runTest(options: TestOptions = {}): Promise<void> {
  const { watch = true, codeCoverage = true, tags = '' } = options;

  const args = ['test'];
  if (watch) {
    args.push('--watch=true');
  }
  if (codeCoverage) {
    args.push('--code-coverage');
  }

  return execTask('ng', args, { NG_TEST_TAGS: tags });
}
