/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { chain, Rule } from '@angular-devkit/schematics';

import { Schema } from './schema';
import { buildComponent } from '../utils/build-component';

export default function(options: Schema): Rule {
  return chain([
    buildComponent({ ...options })
  ]);
}
