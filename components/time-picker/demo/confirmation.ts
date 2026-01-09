import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-confirmation',
  imports: [NzTimePickerModule],
  template: ` <nz-time-picker nzNeedConfirm />`
})
export class NzDemoTimePickerConfirmationComponent {}
