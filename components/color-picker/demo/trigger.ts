import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-trigger',
  imports: [NzColorPickerModule],
  template: `<nz-color-picker nzTrigger="hover"></nz-color-picker>`
})
export class NzDemoColorPickerTriggerComponent {}
