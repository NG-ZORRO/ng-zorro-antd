/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzTrim'
})
export class NzTrimPipe implements PipeTransform {
  transform(text: string, chars: string = '\\s'): string {
    return typeof text === 'string' ? text.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '') : text;
  }
}
