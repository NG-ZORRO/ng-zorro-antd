import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-basic',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker></nz-color-picker>`
})
export class NzDemoColorPickerBasicComponent {}
