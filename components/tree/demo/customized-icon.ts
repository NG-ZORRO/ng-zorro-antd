import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree [nzData]="nodes" nzShowIcon [nzExpandedIcon]="expandedIconTpl">
      <ng-template #expandedIconTpl let-node>
        <i nz-icon [nzType]="node.origin.icon" class="ant-tree-switcher-icon"></i>
      </ng-template>
    </nz-tree>
    <nz-tree [nzData]="nodes" nzShowIcon [nzExpandedIcon]="mutiExpandedIconTpl">
      <ng-template #mutiExpandedIconTpl let-node>
        <i
          *ngIf="!node.origin.isLeaf"
          nz-icon
          [nzType]="node.isExpanded ? 'folder-open' : 'folder'"
          class="ant-tree-switcher-line-icon"
        ></i>
        <i *ngIf="node.origin.isLeaf" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
      </ng-template>
    </nz-tree>
  `
})
export class NzDemoTreeCustomizedIconComponent {
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf', key: '1001', icon: 'meh', isLeaf: true },
        { title: 'leaf', key: '1002', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}
