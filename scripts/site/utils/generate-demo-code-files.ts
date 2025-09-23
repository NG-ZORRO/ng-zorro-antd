/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ensureFileSync, writeJSONSync } from 'fs-extra';

import path from 'path';

import prism from '../markdown/prism';
import { ComponentDemo } from '../types';

export function generateDemoCodeFiles(content: ComponentDemo, sitePath: string): void {
  const lang = 'angular';
  const demoMap = content.demoMap;
  for (const key in demoMap) {
    const rawCode = demoMap[key].ts;
    const highlightCode = prism.highlight(rawCode, prism.languages[lang], lang);
    const targetPath = path.join(sitePath, 'doc/assets/codes', `${content.name}-demo-${key}.json`);

    ensureFileSync(targetPath);
    writeJSONSync(
      targetPath,
      {
        highlightCode,
        rawCode
      },
      {}
    );
  }
}
