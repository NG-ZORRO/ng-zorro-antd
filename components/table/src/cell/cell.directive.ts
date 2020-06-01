/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import { NzTableStyleService } from '../table-style.service';

@Directive({
  selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
  host: {
    '[class.ant-table-cell]': 'isInsideTable'
  }
})
export class NzTableCellDirective {
  isInsideTable = false;
  constructor(@Optional() nzTableStyleService: NzTableStyleService) {
    this.isInsideTable = !!nzTableStyleService;
  }
}
