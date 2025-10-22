/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Schema as ApplicationSchema, Style } from '@schematics/angular/application/schema';

export interface Schema extends ApplicationSchema {
  project: string;
  style: Style;
  prefix: string;
}
