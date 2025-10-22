/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, writeFileSync } from 'fs-extra';

import path from 'path';

const changelogPath = path.resolve(__dirname, `../../CHANGELOG.md`);

function replace(path: string): void {
  const content = readFileSync(path, 'utf8');
  const replaced = content.replace(/\*\*\w+:(?!\*\*)/g, '**').replace(/\*\s\*\*\s/g, '* **');
  writeFileSync(path, replaced);
}

replace(changelogPath);
