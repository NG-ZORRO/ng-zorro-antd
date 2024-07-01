/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from './any';

// Define a property that can also returned by called function
export type FunctionProp<T> = (...args: NzSafeAny[]) => T;
