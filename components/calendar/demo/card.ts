import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-card',
  template: `
    <div [ngStyle]="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <nz-calendar
        [nzFullscreen]="false"
        (nzSelectChange)="onValueChange($event)"
        (nzPanelChange)="onPanelChange($event)"
      ></nz-calendar>
    </div>
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
