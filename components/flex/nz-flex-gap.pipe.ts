/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { NzGap } from './typings';

@Pipe({
  name: 'nzFlexGap',
  standalone: true
})
export class NzFlexGapPipe implements PipeTransform {
  public transform(gap: NzGap): string {
    switch (gap) {
      case 'small':
        return '8px';
      case 'middle':
        return '16px';
      case 'large':
        return '24px';
      default:
        if (typeof gap === 'number') {
          return `${gap}px`;
        }
        return gap;
    }
  }
}
