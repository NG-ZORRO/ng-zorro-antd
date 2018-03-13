import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-basic',
  template: `
    <nz-calendar [(ngModel)]="date" [(nzMode)]="mode"></nz-calendar>
  `
})
export class NzDemoCalendarBasicComponent {
  date = new Date(2012, 11, 21);
  mode = 'month';
}
