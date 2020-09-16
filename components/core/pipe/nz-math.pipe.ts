/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { sum } from 'ng-zorro-antd';
import { NzSafeAny } from '../types';

export enum EMathMethod {
  SUM = 'sum',
  MAX = 'max',
  MIN = 'min',
  AVG = 'avg'
}

@Pipe({
  name: 'nzMath'
})
export class NzMathPipe implements PipeTransform {
  getMethodResult(data: number[], method: EMathMethod): number {
    let result: number = data[0];
    data.forEach((item: NzSafeAny) => {
      if (method === EMathMethod.MAX) {
        if (result < item) {
          result = item;
        }
      } else if (method === EMathMethod.MIN) {
        if (result > item) {
          result = item;
        }
      }
    });
    return result;
  }

  transform(value: NzSafeAny, method: EMathMethod): undefined | number {
    if (!Array.isArray(value)) {
      return value;
    }
    if (value.length === 0) {
      return undefined;
    }
    if (method === EMathMethod.SUM) {
      return sum(value);
    } else if (method === EMathMethod.AVG) {
      return sum(value) / value.length;
    } else if (method === EMathMethod.MAX || method === EMathMethod.MIN) {
      return this.getMethodResult(value, method);
    } else {
      throw Error(`InvalidPipeArgument: Math pipe doesn't have this method`);
    }
  }
}
