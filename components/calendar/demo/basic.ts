import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-basic',
  imports: [FormsModule, NzCalendarModule],
  template: `<nz-calendar [(ngModel)]="date" [(nzMode)]="mode" (nzPanelChange)="panelChange($event)"></nz-calendar>`
})
export class NzDemoCalendarBasicComponent {
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
