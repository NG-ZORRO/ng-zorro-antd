import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-value',
  imports: [FormsModule, NzTimePickerModule],
  template: `<nz-time-picker [(ngModel)]="time" />`
})
export class NzDemoTimePickerValueComponent {
  time: Date | null = null;
}
