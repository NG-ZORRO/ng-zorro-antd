/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'tr[nzExpand]',
  host: {
    '[class.ant-table-expanded-row]': 'true',
    '[hidden]': `!nzExpand`
  }
})
export class NzTrExpandDirective {
  @Input() nzExpand = true;
}
