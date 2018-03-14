import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-basic',
  template: `
    <nz-timepicker [(ngModel)]="time" [nzOffset]='[0, 0, 0]'></nz-timepicker>
  `
})
export class NzDemoTimepickerBasicComponent {
  time: Date|null = null;
}
