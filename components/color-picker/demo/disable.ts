import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-disable',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzDisabled nzShowText></nz-color-picker>`
})
export class NzDemoColorPickerDisableComponent {}
