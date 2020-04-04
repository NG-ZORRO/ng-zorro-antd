/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Directive({
  selector: 'th[nzEllipsis],td[nzEllipsis]',
  host: {
    '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
  }
})
export class NzCellEllipsisDirective {
  @Input() @InputBoolean() nzEllipsis = true;
}
