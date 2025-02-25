import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-disable-alpha',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzDisabledAlpha></nz-color-picker>`
})
export class NzDemoColorPickerDisableAlphaComponent {}
