import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-date-picker-clear-icon',
  imports: [ReactiveFormsModule, NzDatePickerModule, NzIconModule],
  template: `
    <nz-date-picker [formControl]="date">
      <nz-icon nzDatePickerClearIcon nzType="close" />
    </nz-date-picker>
    <nz-range-picker [formControl]="range">
      <nz-icon nzDatePickerClearIcon nzType="close" />
    </nz-range-picker>
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerClearIconComponent {
  readonly date = new FormControl(new Date(2026, 0, 1));
  readonly range = new FormControl([new Date(2026, 0, 1), new Date(2026, 0, 7)]);
}
