import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-select',
  template: `
    <nz-alert nzMessage="Your selected date: {{ selectedValue | date:'yyyy-MM-dd' }}"></nz-alert>
    <nz-calendar [(ngModel)]="selectedValue"></nz-calendar>
  `
})
export class NzDemoCalendarSelectComponent {
  selectedValue = new Date('2017-01-25');
}
