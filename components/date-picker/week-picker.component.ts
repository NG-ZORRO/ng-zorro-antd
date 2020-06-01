/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional } from '@angular/core';
import { NzDatePickerComponent } from './date-picker.component';

@Directive({
  selector: 'nz-week-picker',
  exportAs: 'nzWeekPicker'
})
// tslint:disable-next-line:directive-class-suffix
export class NzWeekPickerComponent {
  constructor(@Optional() @Host() public datePicker: NzDatePickerComponent) {
    this.datePicker.showWeek = true;
    this.datePicker.nzMode = 'week';
    this.datePicker.nzFormat = 'yyyy-ww';
  }
}
