import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-size',
  imports: [FormsModule, NzTimePickerModule],
  template: `
    <nz-time-picker [(ngModel)]="time" nzSize="large" />
    <nz-time-picker [(ngModel)]="time" />
    <nz-time-picker [(ngModel)]="time" nzSize="small" />
  `,
  styles: `
    nz-time-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoTimePickerSizeComponent {
  time = new Date();
}
