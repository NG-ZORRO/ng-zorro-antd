import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-disabled',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker nzDisabled></nz-date-picker>
    <br />
    <nz-date-picker nzMode="month" nzDisabled></nz-date-picker>
    <br />
    <nz-range-picker nzDisabled></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerDisabledComponent {}
