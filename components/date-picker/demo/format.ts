import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-format',
  template: `
    <nz-date-picker [nzFormat]="dateFormat"></nz-date-picker>
    <br>
    <nz-month-picker [nzFormat]="monthFormat"></nz-month-picker>
    <br>
    <nz-range-picker [nzFormat]="dateFormat"></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerFormatComponent {
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
}
