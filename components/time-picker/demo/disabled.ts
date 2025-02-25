import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-disabled',
  imports: [NzTimePickerModule],
  template: `<nz-time-picker nzDisabled></nz-time-picker>`
})
export class NzDemoTimePickerDisabledComponent {}
