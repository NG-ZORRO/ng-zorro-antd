/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: 'th[nzBreakWord],td[nzBreakWord]',
  host: {
    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
  }
})
export class NzCellBreakWordDirective {
  @Input({ transform: booleanAttribute }) nzBreakWord = true;
}
