import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-clear',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzAllowClear nzTitle="Allow Clear" />`
})
export class NzDemoColorPickerClearComponent {}
