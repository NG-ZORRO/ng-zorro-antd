import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-value',
  template: `
    <nz-time-picker [(ngModel)]="time" (ngModelChange)="log($event)"></nz-time-picker>
  `
})
export class NzDemoTimePickerValueComponent {
  time: Date | null = null;

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }
}
