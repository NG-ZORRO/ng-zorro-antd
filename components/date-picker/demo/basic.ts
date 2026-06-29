import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

function getISOWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

@Component({
  selector: 'nz-demo-date-picker-basic',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="week" [(ngModel)]="date" (ngModelChange)="getWeek($event)" />
    <br />
    <nz-date-picker nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="quarter" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
  `,
  styles: `
    nz-date-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerBasicComponent {
  readonly date = signal<Date | null>(null);

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}
