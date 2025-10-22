import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-date-picker-week-number',
  imports: [FormsModule, NzDatePickerModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="showWeekNumber">
      <label nz-radio-button [nzValue]="true">true</label>
      <label nz-radio-button [nzValue]="false">false</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-date-picker [nzShowWeekNumber]="showWeekNumber"></nz-date-picker>
    <br />
    <nz-range-picker [nzShowWeekNumber]="showWeekNumber"></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerWeekNumberComponent {
  showWeekNumber: boolean = false;
}
