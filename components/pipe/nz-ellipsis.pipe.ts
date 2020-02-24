/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzEllipsis'
})
export class NzEllipsisPipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  transform(value: any, length?: number, suffix: string = '', preserve: boolean = false): any {
    if (typeof value !== 'string') {
      return value;
    }

    const len = typeof length === 'undefined' ? value.length : length;

    if (value.length <= len) {
      return value;
    }

    let index = len;

    if (preserve) {
      if (value.indexOf(' ', len) === -1) {
        index = value.length;
      } else {
        index = value.indexOf(' ', len);
      }
    }

    return value.substring(0, index) + suffix;
  }
}
