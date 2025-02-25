import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-select',
  imports: [DatePipe, FormsModule, NzAlertModule, NzCalendarModule],
  template: `
    <nz-alert nzMessage="Your selected date: {{ selectedValue | date: 'yyyy-MM-dd' }}"></nz-alert>
    <nz-calendar [(ngModel)]="selectedValue" (nzSelectChange)="selectChange($event)"></nz-calendar>
  `
})
export class NzDemoCalendarSelectComponent {
  selectedValue = new Date('2017-01-25');

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }
}
