import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-status',
  template: `
    <nz-space nzDirection="vertical" style="width:100%;">
      <nz-tree-select
        *nzSpaceItem
        [nzNodes]="nodes"
        nzStatus="error"
        nzPlaceHolder="Error"
        [(ngModel)]="value"
        style="width:100%;"
      ></nz-tree-select>
      <nz-tree-select
        *nzSpaceItem
        nzMultiple
        [nzNodes]="nodes"
        nzShowSearch
        nzStatus="warning"
        nzPlaceHolder="Warning multiple"
        [(ngModel)]="value"
        style="width:100%;"
      ></nz-tree-select>
    </nz-space>
  `
})
export class NzDemoTreeSelectStatusComponent {
  value?: string;
  nodes = [];
}
