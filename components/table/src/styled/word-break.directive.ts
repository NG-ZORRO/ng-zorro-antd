/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Directive({
  selector: 'th[nzBreakWord],td[nzBreakWord]',
  host: {
    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
  }
})
export class NzCellBreakWordDirective {
  static ngAcceptInputType_nzBreakWord: BooleanInput;

  @Input() @InputBoolean() nzBreakWord = true;
}
