import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-block',
  imports: [NzColorPickerModule],
  template: `
    <nz-color-block nzSize="small"></nz-color-block>
    <nz-color-block></nz-color-block>
    <nz-color-block nzSize="large"></nz-color-block>
  `,
  styles: [
    `
      nz-color-block {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoColorPickerBlockComponent {}
