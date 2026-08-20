/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject } from '@angular/core';

import { NzHijriDatePickerComponent } from './hijri-date-picker.component';

@Directive({
  selector: 'nz-hijri-year-picker',
  exportAs: 'nzHijriYearPicker'
})
export class NzHijriYearPickerComponent {
  datePicker = inject(NzHijriDatePickerComponent, { host: true });

  constructor() {
    this.datePicker.nzMode = 'year';
  }
}
