import { Component } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-select-async',
  template: `
    <nz-tree-select
      style="width: 250px"
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys"
      [(ngModel)]="value"
      [nzDropdownMatchSelectWidth]="true"
      [nzDropdownStyle]="{ 'max-height': '300px' }"
      [nzNodes]="nodes"
      [nzAsyncData]="true"
      (nzExpandChange)="onExpandChange($event)"
    >
    </nz-tree-select>
  `
})
export class NzDemoTreeSelectAsyncComponent {
  expandKeys = ['0-0'];
  value: string;
  nodes = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1'
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2'
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1'
    }
  ];

  onExpandChange(e: NzFormatEmitEvent): void {
    const node = e.node;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.loadNode().then(data => {
        node.addChildren(data);
      });
    }
  }

  loadNode(): Promise<NzTreeNodeOptions[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { title: 'Child Node', key: `${new Date().getTime()}-0` },
            { title: 'Child Node', key: `${new Date().getTime()}-1` }
          ]),
        1000
      );
    });
  }
}
