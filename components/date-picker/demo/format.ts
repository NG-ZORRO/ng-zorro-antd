import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-format',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker [nzFormat]="dateFormat"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="month" [nzFormat]="monthFormat"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="quarter" [nzFormat]="quarterFormat"></nz-date-picker>
    <br />
    <nz-range-picker [nzFormat]="dateFormat"></nz-range-picker>
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
export class NzDemoDatePickerFormatComponent {
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  quarterFormat = 'yyyy/[Q]Q';
}
