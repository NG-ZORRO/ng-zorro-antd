/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'tfoot[nzSummary]',
  host: {
    class: 'ant-table-summary'
  },
  standalone: true
})
export class NzTfootSummaryDirective {}
