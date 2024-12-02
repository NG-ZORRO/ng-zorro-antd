import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-size',
  imports: [NzSpinModule],
  template: `
    <nz-spin nzSimple nzSize="small"></nz-spin>
    <nz-spin nzSimple></nz-spin>
    <nz-spin nzSimple nzSize="large"></nz-spin>
  `,
  styles: [
    `
      nz-spin {
        display: inline-block;
        margin-right: 16px;
      }
    `
  ]
})
export class NzDemoSpinSizeComponent {}
