import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'nz-demo-date-picker-inline',
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Default">
        <nz-date-picker nzInline [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
      </nz-tab>
      <nz-tab nzTitle="Week">
        <nz-date-picker nzInline nzMode="week" [(ngModel)]="date" (ngModelChange)="getWeek($event)"></nz-date-picker>
      </nz-tab>
      <nz-tab nzTitle="Month">
        <nz-date-picker nzInline nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
      </nz-tab>
      <nz-tab nzTitle="Year">
        <nz-date-picker nzInline nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
      </nz-tab>
      <nz-tab nzTitle="Range">
        <nz-range-picker nzInline [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)"></nz-range-picker>
      </nz-tab>
      <nz-tab nzTitle="Range Time">
        <nz-range-picker nzInline nzShowTime [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)"></nz-range-picker>
      </nz-tab>
      <nz-tab nzTitle="Range Week">
        <nz-range-picker nzInline nzMode="week" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)"></nz-range-picker>
      </nz-tab>
      <nz-tab nzTitle="Range Month">
        <nz-range-picker nzInline nzMode="month" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)"></nz-range-picker>
      </nz-tab>
      <nz-tab nzTitle="Range Year">
        <nz-range-picker nzInline nzMode="year" [(ngModel)]="rangeDate" (ngModelChange)="onChange($event)"></nz-range-picker>
      </nz-tab>
    </nz-tabset>
  `,
  styles: [
    `
      :host ::ng-deep .ant-tabs-tabpane {
        padding: 24px;
        overflow: auto;
      }
    `
  ]
})
export class NzDemoDatePickerInlineComponent {
  date = null;
  rangeDate = null;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}
