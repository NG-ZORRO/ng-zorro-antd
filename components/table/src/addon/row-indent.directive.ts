/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'nz-row-indent',
  host: {
    class: 'ant-table-row-indent',
    '[style.padding-left.px]': 'indentSize'
  }
})
export class NzRowIndentDirective {
  @Input() indentSize = 0;
}
