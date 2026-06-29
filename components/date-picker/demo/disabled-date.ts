import { Component } from '@angular/core';

import { DisabledTimeFn, DisabledTimePartial, NzDatePickerModule } from 'ng-zorro-antd/date-picker';

function startOfDate(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function differenceInCalendarDays(first: Date, second: Date): number {
  return Math.round((startOfDate(first).getTime() - startOfDate(second).getTime()) / 86400000);
}

function setHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(hours);
  return result;
}

@Component({
  selector: 'nz-demo-date-picker-disabled-date',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [nzDisabledDate]="disabledDate"
      [nzDisabledTime]="disabledDateTime"
      [nzShowTime]="{ nzDefaultOpenValue: timeDefaultValue }"
    />
    <br />
    <nz-date-picker nzMode="month" [nzDisabledDate]="disabledDate" />
    <br />
    <nz-date-picker nzMode="quarter" [nzDisabledDate]="disabledDate" />
    <br />
    <nz-date-picker nzMode="year" [nzDisabledDate]="disabledDate" />
    <br />
    <nz-range-picker
      [nzDisabledDate]="disabledDate"
      [nzDisabledTime]="disabledRangeTime"
      [nzShowTime]="{ nzHideDisabledOptions: true, nzDefaultOpenValue: timeDefaultValue }"
      nzFormat="yyyy-MM-dd HH:mm:ss"
    />
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerDisabledDateComponent {
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;

  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(0, 24).splice(4, 20),
    nzDisabledMinutes: () => this.range(30, 60),
    nzDisabledSeconds: () => [55, 56]
  });

  disabledRangeTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => this.range(0, 60).splice(4, 20),
        nzDisabledMinutes: () => this.range(30, 60),
        nzDisabledSeconds: () => [55, 56]
      };
    }
    return {
      nzDisabledHours: () => this.range(0, 60).splice(20, 4),
      nzDisabledMinutes: () => this.range(0, 31),
      nzDisabledSeconds: () => [55, 56]
    };
  };
}
