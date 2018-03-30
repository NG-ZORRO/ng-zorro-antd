import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-size',
  template: `
    <nz-time-picker [(ngModel)]="time" nzSize="large"></nz-time-picker>
    <nz-time-picker [(ngModel)]="time"></nz-time-picker>
    <nz-time-picker [(ngModel)]="time" nzSize="small"></nz-time-picker>
  `
})
export class NzDemoTimePickerSizeComponent {
  time = new Date();
}
