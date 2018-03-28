import { Component, OnInit } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-format',
  template: `
    <nz-date-picker [nzDefaultValue]="defaultDate" [nzFormat]="dateFormat"></nz-date-picker>
    <br>
    <nz-month-picker [nzDefaultValue]="defaultMonth" [nzFormat]="monthFormat"></nz-month-picker>
    <br>
    <nz-range-picker [nzDefaultValue]="defaultRange" [nzFormat]="dateFormat"></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerFormatComponent {
  defaultDate = new CandyDate('2015/01/01');
  defaultMonth = new CandyDate('2015/01');
  defaultRange = [ new CandyDate('2015/01/01'), new CandyDate('2015/01/01') ];

  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
}
