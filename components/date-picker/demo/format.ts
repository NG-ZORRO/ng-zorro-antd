import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-format',
  template: `
    <nz-date-picker [nzFormat]="dateFormat"></nz-date-picker>
    <nz-month-picker [nzFormat]="monthFormat"></nz-month-picker>
    <nz-range-picker [nzFormat]="dateFormat"></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker {
        display: block;
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerFormatComponent {
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
}
