/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzHumanizeDuration'
})
export class NzHumanizeDurationPipe implements PipeTransform {
  transform(): string {
    return '';
  }
}
