/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'th[nzAlign],td[nzAlign]',
  host: {
    '[style.text-align]': 'nzAlign'
  }
})
export class NzCellAlignDirective {
  @Input() nzAlign: 'left' | 'right' | 'center' | null = null;
}
