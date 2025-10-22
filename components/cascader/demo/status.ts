import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';

@Component({
  selector: 'nz-demo-cascader-status',
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader [nzOptions]="nzOptions" nzStatus="error"></nz-cascader>
    <br />
    <br />
    <nz-cascader [nzOptions]="nzOptions" nzStatus="warning"></nz-cascader>
  `
})
export class NzDemoCascaderStatusComponent {
  nzOptions: NzCascaderOption[] = [];
}
