import { Component, OnInit } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-disabled',
  template: `
    <nz-date-picker [nzDefaultValue]="defaultDate" [nzFormat]="dateFormat" nzDisabled></nz-date-picker>
    <br>
    <nz-month-picker [nzDefaultValue]="defaultMonth" [nzFormat]="monthFormat" nzDisabled></nz-month-picker>
    <br>
    <nz-range-picker [nzDefaultValue]="defaultRange" [nzFormat]="dateFormat" nzDisabled></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerDisabledComponent {
  defaultDate = new CandyDate('2015-06-06');
  defaultMonth = new CandyDate('2015-06');
  defaultRange = [ new CandyDate('2015-06-06'), new CandyDate('2015-06-06') ];

  dateFormat = 'yyyy-MM-dd';
  monthFormat = 'yyyy-MM';
}
