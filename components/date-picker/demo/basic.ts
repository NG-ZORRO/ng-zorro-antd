import { Component } from '@angular/core';
import * as getISOWeek from 'date-fns/get_iso_week';

@Component({
  selector: 'nz-demo-date-picker-basic',
  template: `
    <nz-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" nzShowTime></nz-date-picker>
    <br>
    <nz-month-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" nzPlaceHolder="Select month"></nz-month-picker>
    <br>
    <nz-range-picker [(ngModel)]="dateRange" (ngModelChange)="onChange($event)" nzShowTime></nz-range-picker>
    <br>
    <nz-week-picker [(ngModel)]="date" (ngModelChange)="getWeek($event)" nzPlaceHolder="Select week"></nz-week-picker>
  `,
  styles  : [ `
    nz-date-picker, nz-month-picker, nz-range-picker, nz-week-picker {
      margin: 0 8px 12px 0;
    }
  ` ]
})

export class NzDemoDatePickerBasicComponent {
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}
