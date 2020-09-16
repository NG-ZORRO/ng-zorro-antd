/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzSome'
})
export class NzSomePipe implements PipeTransform {
  // tslint:disable-next-line:ban-types
  transform<T>(value: T, predicate: Function): T | boolean {
    if (!Array.isArray(value) || !predicate) {
      return value;
    }
    let [res, i] = [false, -1];

    while (++i < value.length && !res) {
      res = predicate(value[i], i, value);
    }

    return res;
  }
}
