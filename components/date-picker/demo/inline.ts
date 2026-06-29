import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

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
  selector: 'nz-demo-date-picker-inline',
  imports: [FormsModule, NzDatePickerModule, NzTabsModule],
  template: `
    <nz-tabs>
      <nz-tab nzTitle="Default">
        <nz-date-picker nzInline [(ngModel)]="date" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Week">
        <nz-date-picker nzInline nzMode="week" [(ngModel)]="date" (ngModelChange)="getWeek($event)" />
      </nz-tab>
      <nz-tab nzTitle="Month">
        <nz-date-picker nzInline nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Quarter">
        <nz-date-picker nzInline nzMode="quarter" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Year">
        <nz-date-picker nzInline nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range">
        <nz-range-picker nzInline [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range Time">
        <nz-range-picker nzInline nzShowTime [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range Week">
        <nz-range-picker nzInline nzMode="week" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range Month">
        <nz-range-picker nzInline nzMode="month" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range Quarter">
        <nz-range-picker nzInline nzMode="quarter" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
      <nz-tab nzTitle="Range Year">
        <nz-range-picker nzInline nzMode="year" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)" />
      </nz-tab>
    </nz-tabs>
  `,
  styles: `
    :host ::ng-deep .ant-tabs-tabpane {
      padding: 24px;
      overflow: auto;
    }
  `
})
export class NzDemoDatePickerInlineComponent {
  readonly date = signal<Date | null>(null);
  readonly rangeDate = signal<Date[] | null>(null);

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}
