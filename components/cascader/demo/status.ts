import { Component } from '@angular/core';

import { NzCascaderOption } from 'ng-zorro-antd/cascader';

@Component({
  selector: 'nz-demo-cascader-status',
  template: `
    <nz-cascader [nzOptions]="nzOptions" nzStatus="error"></nz-cascader>
    <nz-cascader [nzOptions]="nzOptions" nzStatus="warning"></nz-cascader>
  `,
  styles: [
    `
      .ant-cascader {
        width: 100%;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoCascaderStatusComponent {
  nzOptions: NzCascaderOption[] = [];
}
