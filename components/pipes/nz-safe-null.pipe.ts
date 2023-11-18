/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { isNil } from 'ng-zorro-antd/core/util';

/**
 * @deprecated v17.0.0 - Use Nullish coalescing operator (??) instead of `NzSafeNullPipe`.
 */
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
