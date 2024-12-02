/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: 'th[nzEllipsis],td[nzEllipsis]',
  host: {
    '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
  }
})
export class NzCellEllipsisDirective {
  @Input({ transform: booleanAttribute }) nzEllipsis = true;
}
