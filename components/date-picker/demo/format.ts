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
  readonly dateFormat = 'yyyy/MM/dd';
  readonly monthFormat = 'yyyy/MM';
  readonly quarterFormat = 'yyyy/[Q]Q';
}
