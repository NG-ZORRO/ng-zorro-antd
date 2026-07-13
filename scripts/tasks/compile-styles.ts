/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { compile } from '../build/compile-styles';
import { copyStylesToSrc } from '../build/migration-styles';

/** Compile less to the publish directory (gulp `library:compile-less`). */
async function main(): Promise<void> {
  await compile();
  copyStylesToSrc();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
