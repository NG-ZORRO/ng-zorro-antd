/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { mkdirsSync, copySync, outputFileSync } from 'fs-extra';

import path from 'path';

import { buildConfig } from '../build-config';

const sourcePath = buildConfig.publishDir;
const targetPath = path.join(buildConfig.publishDir, `src`);
const lessContent = `@root-entry-name: default;
@import "../style/entry.less";
@import "../components.less;`;

export function copyStylesToSrc(): void {
  mkdirsSync(targetPath);
  copySync(path.resolve(sourcePath, `style`), path.resolve(targetPath, `style`));
  copySync(path.resolve(sourcePath, `ng-zorro-antd.css`), path.resolve(targetPath, `ng-zorro-antd.css`));
  copySync(path.resolve(sourcePath, `ng-zorro-antd.min.css`), path.resolve(targetPath, `ng-zorro-antd.min.css`));
  outputFileSync(path.resolve(targetPath, `ng-zorro-antd.less`), lessContent);
}
