import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-size',
  imports: [NzInputModule],
  template: `
    <input nz-input placeholder="large size" nzSize="large" />
    <br />
    <br />
    <input nz-input placeholder="default size" nzSize="default" />
    <br />
    <br />
    <input nz-input placeholder="small size" nzSize="small" />
  `
})
export class NzDemoInputSizeComponent {}
