import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-no-data',
  imports: [NzSpinModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="[]"
      nzPlaceHolder="Please select"
      [nzNotFoundContent]="noData"
    ></nz-tree-select>
    <ng-template #noData>
      <div style="height: 200px; display: flex; justify-content: center; align-items: center">
        <nz-spin nzSimple></nz-spin>
      </div>
    </ng-template>
  `
})
export class NzDemoTreeSelectNoDataComponent {}
