import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-hide-column',
  imports: [FormsModule, NzTimePickerModule],
  template: `<nz-time-picker [(ngModel)]="time" nzFormat="HH:mm"></nz-time-picker>`
})
export class NzDemoTimePickerHideColumnComponent {
  time = new Date();
}
