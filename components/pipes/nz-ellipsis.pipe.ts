/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'nzEllipsis'
})
export class NzEllipsisPipe implements PipeTransform {
  transform(value: NzSafeAny, length?: number, suffix: string = ''): NzSafeAny {
    if (typeof value !== 'string') {
      return value;
    }

    const len = typeof length === 'undefined' ? value.length : length;

    if (value.length <= len) {
      return value;
    }

    return value.substring(0, len) + suffix;
  }
}
