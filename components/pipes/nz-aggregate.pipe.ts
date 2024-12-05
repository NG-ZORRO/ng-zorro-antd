/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { sum } from 'ng-zorro-antd/core/util';

export type AggregateMethod = 'sum' | 'max' | 'min' | 'avg';

@Pipe({
  name: 'nzAggregate'
})
export class NzAggregatePipe implements PipeTransform {
  transform(value: number[], method: AggregateMethod): undefined | number {
    if (!Array.isArray(value)) {
      return value;
    }

    if (value.length === 0) {
      return undefined;
    }

    switch (method) {
      case 'sum':
        return sum(value);
      case 'avg':
        return sum(value) / value.length;
      case 'max':
        return Math.max(...value);
      case 'min':
        return Math.min(...value);
      default:
        throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
    }
  }
}
