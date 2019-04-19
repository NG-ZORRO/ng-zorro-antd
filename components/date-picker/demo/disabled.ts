/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-disabled',
  template: `
    <nz-date-picker nzDisabled></nz-date-picker>
    <br />
    <nz-month-picker nzDisabled></nz-month-picker>
    <br />
    <nz-range-picker nzDisabled></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerDisabledComponent {}
