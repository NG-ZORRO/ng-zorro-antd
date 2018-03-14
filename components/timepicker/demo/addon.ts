import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-addon',
  template: `
    <nz-timepicker #timepicker [(ngModel)]="time">
      <button nz-button nzSize="small" nzType="primary" (click)="timepicker.close()">Ok</button>
    </nz-timepicker>
  `
})
export class NzDemoTimepickerAddonComponent {
  time: Date|null = null;
}
