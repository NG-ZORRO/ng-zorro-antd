import { Component } from '@angular/core';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-size',
  imports: [NzColorPickerModule],
  template: `
    <nz-color-picker nzSize="large"></nz-color-picker>
    <br />
    <br />
    <nz-color-picker></nz-color-picker>
    <br />
    <br />
    <nz-color-picker nzSize="small"></nz-color-picker>
  `
})
export class NzDemoColorPickerSizeComponent {}
