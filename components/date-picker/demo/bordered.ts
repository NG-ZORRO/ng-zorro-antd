import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-bordered',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker nzBorderless></nz-date-picker>
    <br />
    <nz-range-picker nzBorderless></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerBorderedComponent {}
