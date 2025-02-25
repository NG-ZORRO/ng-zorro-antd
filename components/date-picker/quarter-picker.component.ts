/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject } from '@angular/core';

import { NzDatePickerComponent } from './date-picker.component';

@Directive({
  selector: 'nz-quarter-picker',
  exportAs: 'nzQuarterPicker'
})
export class NzQuarterPickerComponent {
  datePicker = inject(NzDatePickerComponent, { host: true });

  constructor() {
    this.datePicker.nzMode = 'quarter';
  }
}
