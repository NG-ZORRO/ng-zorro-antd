import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-basic',
  template: `
    <nz-time-picker [(ngModel)]="time" [nzOffset]='[0, 0, 0]'></nz-time-picker>
  `
})
export class NzDemoTimePickerBasicComponent {
  time: Date | null = null;
}
