import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-content',
  template: `
    <nz-calendar [nzLocale]="'zh-cn'">
      <ng-template #dateCell let-day>
        <nz-badge [nzStatus]="'success'" [nzText]="'Sunday'" *ngIf="(day.date|date:'EEE')==='Sun'"></nz-badge>
        <nz-badge [nzStatus]="'processing'" [nzText]="'Saturday'" *ngIf="(day.date|date:'EEE')==='Sat'"></nz-badge>
      </ng-template>
      <ng-template #monthCell let-month>
        <nz-badge [nzStatus]="'success'" [nzText]="'This Month is Sep'" *ngIf="month.index==11"></nz-badge>
      </ng-template>
    </nz-calendar>`,
  styles  : []
})
export class NzDemoCalendarContentComponent { }
