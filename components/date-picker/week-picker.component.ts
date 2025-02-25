/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject } from '@angular/core';

import { NzDatePickerComponent } from './date-picker.component';

@Directive({
  selector: 'nz-week-picker',
  exportAs: 'nzWeekPicker'
})
export class NzWeekPickerComponent {
  datePicker = inject(NzDatePickerComponent, { host: true });

  constructor() {
    this.datePicker.nzMode = 'week';
  }
}
