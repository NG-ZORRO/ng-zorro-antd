import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-bordered',
  imports: [NzTimePickerModule],
  template: `<nz-time-picker nzBorderless></nz-time-picker>`
})
export class NzDemoTimePickerBorderedComponent {}
