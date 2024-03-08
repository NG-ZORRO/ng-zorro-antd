/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ZorroComponentOptions } from '../utils/build-component';

export interface Schema extends ZorroComponentOptions {
  [key: string]: string | boolean;
}
