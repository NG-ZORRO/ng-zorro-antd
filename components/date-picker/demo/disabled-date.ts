import { Component } from '@angular/core';
import * as differenceInDays from 'date-fns/difference_in_days';
import * as setHours from 'date-fns/set_hours';

@Component({
  selector: 'nz-demo-date-picker-disabled-date',
  template: `
    <nz-date-picker
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [nzDisabledDate]="disabledDate"
      [nzDisabledTime]="disabledDateTime"
      [nzShowTime]="{ nzDefaultOpenValue: timeDefaultValue }">
    </nz-date-picker>
    <br>
    <nz-month-picker [nzDisabledDate]="disabledDate" nzPlaceholder="Select month"></nz-month-picker>
    <br>
    <nz-range-picker
      [nzDisabledDate]="disabledDate"
      [nzDisabledTime]="disabledRangeTime"
      [nzShowTime]="{ nzHideDisabledOptions: true, nzDefaultOpenValue: timeDefaultValue }"
      nzFormat="yyyy-MM-dd HH:mm:ss"
    ></nz-range-picker>
  `,
  styles  : [ `
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  ` ]
})

export class NzDemoDatePickerDisabledDateComponent {
  today = new Date();
  timeDefaultValue = setHours(new Date());

  range(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInDays(current, this.today) > 0;
  }

  disabledDateTime = (): object => {
    return {
      nzDisabledHours  : () => this.range(0, 24).splice(4, 20),
      nzDisabledMinutes: () => this.range(30, 60),
      nzDisabledSeconds: () => [ 55, 56 ]
    };
  }

  disabledRangeTime = (value: Date[], type: 'start' | 'end'): object => {
    if (type === 'start') {
      return {
        nzDisabledHours  : () => this.range(0, 60).splice(4, 20),
        nzDisabledMinutes: () => this.range(30, 60),
        nzDisabledSeconds: () => [ 55, 56 ]
      };
    }
    return {
      nzDisabledHours  : () => this.range(0, 60).splice(20, 4),
      nzDisabledMinutes: () => this.range(0, 31),
      nzDisabledSeconds: () => [ 55, 56 ]
    };
  }
}
