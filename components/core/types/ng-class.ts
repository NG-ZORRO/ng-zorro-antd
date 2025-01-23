/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from './any';

export type NgClassType = string | string[] | NgClassInterface;

export type NgClassInterface = Record<string, NzSafeAny>;

export type NgStyleInterface = Record<string, NzSafeAny>;
