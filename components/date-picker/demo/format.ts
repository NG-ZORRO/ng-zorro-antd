import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-format',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker [nzFormat]="dateFormat" />
    <br />
    <nz-date-picker nzMode="month" [nzFormat]="monthFormat" />
    <br />
    <nz-date-picker nzMode="quarter" [nzFormat]="quarterFormat" />
    <br />
    <nz-range-picker [nzFormat]="dateFormat" />
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerFormatComponent {
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  quarterFormat = 'yyyy/[Q]Q';
}
