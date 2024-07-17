import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-no-data',
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
      [nzNotFoundContent]="noData"
    ></nz-tree-select>
    <ng-template #noData>
      <div style="height: 200px; display: flex; justify-content: center; align-items: center">
        <nz-spin nzSimple> </nz-spin>
      </div>
    </ng-template>
  `
})
export class NzDemoTreeSelectNoDataComponent {
  value?: string;
  nodes = [];
}
