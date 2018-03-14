import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-value',
  template: `
    <nz-timepicker [(ngModel)]="time" (ngModelChange)="log($event)"></nz-timepicker>
  `
})
export class NzDemoTimepickerValueComponent {
  time: Date|null = null;

  log(time: Date): void {
    console.log(time.toTimeString());
  }
}
