import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-card',
  template: `
    <div [ngStyle]="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <nz-calendar nzCard (nzValueChange)="onValueChange($event)" (nzModeChange)="onModeChange($event)"></nz-calendar>
    </div>
  `
})
export class NzDemoCalendarCardComponent {
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onModeChange(mode: 'month'|'year'): void {
    console.log(`Current mode: ${mode}`);
  }
}
