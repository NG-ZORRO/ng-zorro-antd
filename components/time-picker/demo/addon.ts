import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-addon',
  template: `
    <nz-time-picker #timePicker [(ngModel)]="time">
      <button nz-button nzSize="small" nzType="primary" (click)="timePicker.close()">Ok</button>
    </nz-time-picker>
  `
})
export class NzDemoTimePickerAddonComponent {
  time: Date | null = null;
}
