/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[nzDateCell]',
  exportAs: 'nzDateCell',
  standalone: true
})
export class NzDateCellDirective {}

@Directive({
  selector: '[nzMonthCell]',
  exportAs: 'nzMonthCell',
  standalone: true
})
export class NzMonthCellDirective {}

@Directive({
  selector: '[nzDateFullCell]',
  exportAs: 'nzDateFullCell',
  standalone: true
})
export class NzDateFullCellDirective {}

@Directive({
  selector: '[nzMonthFullCell]',
  exportAs: 'nzMonthFullCell',
  standalone: true
})
export class NzMonthFullCellDirective {}
