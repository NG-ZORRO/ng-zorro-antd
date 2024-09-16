import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-clear',
  standalone: true,
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzAllowClear nzTitle="Allow Clear"></nz-color-picker>`
})
export class NzDemoColorPickerClearComponent {}
