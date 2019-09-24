/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Type, ɵstringify as stringify } from '@angular/core';

// tslint:disable-next-line no-any
export function InvalidPipeArgumentError(type: Type<any>, value: {}): Error {
  return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
