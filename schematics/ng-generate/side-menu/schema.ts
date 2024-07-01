/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Style, Schema as ComponentSchema } from '@schematics/angular/application/schema';

export interface Schema extends ComponentSchema {
  project: string;
  style: Style;
  prefix: string;
}
