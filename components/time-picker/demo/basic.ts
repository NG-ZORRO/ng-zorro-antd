import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-basic',
  template: `
    <nz-time-picker [(ngModel)]="time" [nzDefaultOpenValue]="defaultOpenValue"></nz-time-picker>
  `
})
export class NzDemoTimePickerBasicComponent {
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
}
