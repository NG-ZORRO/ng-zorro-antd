/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// Define a property that can also returned by called function
export type FunctionProp<T> = (...args: any[]) => T; // tslint:disable-line:no-any
