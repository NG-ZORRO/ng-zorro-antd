/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject } from '@angular/core';

import { NzDatePickerComponent } from './date-picker.component';

@Directive({
  selector: 'nz-month-picker',
  exportAs: 'nzMonthPicker'
})
export class NzMonthPickerComponent {
  datePicker = inject(NzDatePickerComponent, { host: true });

  constructor() {
    this.datePicker.nzMode = 'month';
  }
}
