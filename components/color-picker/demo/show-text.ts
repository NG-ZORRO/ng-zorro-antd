import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-show-text',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzShowText />`
})
export class NzDemoColorPickerShowTextComponent {}
