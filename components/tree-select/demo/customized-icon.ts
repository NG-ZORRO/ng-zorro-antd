import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-customized-icon',
  template: `
    <nz-tree-select style="width: 250px" [(ngModel)]="value" [nzNodes]="nodes" nzPlaceHolder="Please select" nzShowIcon> </nz-tree-select>
    <br />
    <nz-tree-select style="width: 250px; margin-top: 20px;" [(ngModel)]="value" [nzNodes]="nodes" nzPlaceHolder="Please select">
      <ng-template #nzTreeTemplate let-node>
        <span class="ant-tree-node-content-wrapper" [class.ant-tree-node-selected]="node.isSelected">
          <span> <i nz-icon [nzType]="node.isExpanded ? 'folder-open' : 'folder'"></i> {{ node.title }} </span>
        </span>
      </ng-template>
    </nz-tree-select>
  `
})
export class NzDemoTreeSelectCustomizedIconComponent {
  value: string;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf 1-0-0', key: '10010', icon: 'meh', isLeaf: true },
        { title: 'leaf 1-0-1', key: '10011', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}
