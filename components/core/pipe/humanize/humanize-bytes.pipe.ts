/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { kbn } from './kbn';

import { InvalidPipeArgumentError } from './errors';

@Pipe({
  name: 'nzHumanizeBytes'
})
export class NzHumanizeBytesPipe implements PipeTransform {
  transform(value: number | string, decimals: number = 2, scaledDecimals: number | null = null): string {
    if (value == null) {
      return '';
    }

    try {
      return kbn.bytes(+value, decimals, scaledDecimals);
    } catch (err) {
      throw InvalidPipeArgumentError(NzHumanizeBytesPipe, err.message);
    }
  }
}
