/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync } from 'fs-extra';

import path from 'path';

import { ComponentIndexDocMeta } from '../types';

const template = String(readFileSync(path.resolve(__dirname, '../template/title.template.html')));

export function generateTitle(meta: ComponentIndexDocMeta): string {
  return template.replace(/{{title}}/g, meta.title).replace(/{{subtitle}}/g, meta.subtitle || '');
}
