import { Component } from '@angular/core';

import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-status',
  imports: [NzTreeSelectModule],
  template: `
    <nz-tree-select [nzNodes]="[]" nzStatus="error" nzPlaceHolder="Error" style="width:100%;"></nz-tree-select>
    <br />
    <br />
    <nz-tree-select
      nzMultiple
      [nzNodes]="[]"
      nzShowSearch
      nzStatus="warning"
      nzPlaceHolder="Warning multiple"
      style="width:100%;"
    ></nz-tree-select>
  `
})
export class NzDemoTreeSelectStatusComponent {}
