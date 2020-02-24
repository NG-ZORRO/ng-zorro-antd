/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from '../core/util/check';

@Pipe({
  name: 'nzSafeNull'
})
export class NzSafeNullPipe implements PipeTransform {
  transform<T>(value: T, replace: string = ''): T | string {
    if (isNil(value)) {
      return replace;
    }
    return value;
  }
}
