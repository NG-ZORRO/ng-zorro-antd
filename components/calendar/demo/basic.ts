import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-basic',
  imports: [FormsModule, NzCalendarModule],
  template: `
    <nz-calendar
      [ngModel]="date()"
      (ngModelChange)="date.set($event)"
      [nzMode]="mode()"
      (nzModeChange)="mode.set($event)"
      (nzPanelChange)="panelChange($event)"
    />
  `
})
export class NzDemoCalendarBasicComponent {
  readonly date = signal(new Date(2012, 11, 21));
  readonly mode = signal<NzCalendarMode>('month');

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
