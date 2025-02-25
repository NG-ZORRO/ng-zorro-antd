import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-basic',
  imports: [FormsModule, NzTimePickerModule],
  template: `<nz-time-picker [(ngModel)]="time" [nzDefaultOpenValue]="defaultOpenValue"></nz-time-picker>`
})
export class NzDemoTimePickerBasicComponent {
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
}
