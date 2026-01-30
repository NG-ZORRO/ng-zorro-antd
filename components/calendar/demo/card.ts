import { Component } from '@angular/core';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-card',
  imports: [NzCalendarModule],
  template: `
    <div class="card">
      <nz-calendar
        [nzFullscreen]="false"
        (nzSelectChange)="onValueChange($event)"
        (nzPanelChange)="onPanelChange($event)"
      />
    </div>
  `,
  styles: `
    .card {
      width: 300px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  `
})
export class NzDemoCalendarCardComponent {
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
}
