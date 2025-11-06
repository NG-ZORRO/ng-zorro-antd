import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-cascader-status',
  imports: [FormsModule, NzCascaderModule, NzFlexModule],
  template: `
    <nz-flex nzVertical nzGap="middle">
      <nz-cascader [nzOptions]="nzOptions" nzStatus="error" />
      <nz-cascader [nzOptions]="nzOptions" nzStatus="warning" />
    </nz-flex>
  `
})
export class NzDemoCascaderStatusComponent {
  readonly nzOptions: NzCascaderOption[] = [];
}
