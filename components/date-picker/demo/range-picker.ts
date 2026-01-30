import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { getISOWeek } from 'date-fns';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-range-picker',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-range-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-range-picker [nzShowTime]="true" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-range-picker nzMode="week" [(ngModel)]="date" (ngModelChange)="getWeek($event)" />
    <br />
    <nz-range-picker nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-range-picker nzMode="quarter" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-range-picker nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
  `,
  styles: `
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerRangePickerComponent {
  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}
