import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree [nzData]="nodes" nzShowIcon [nzExpandedIcon]="expandedIcon1">
      <ng-template #expandedIcon1 let-node>
        <i nz-icon [type]="node.origin.icon" class="ant-tree-switcher-icon"></i>
      </ng-template>
    </nz-tree>
    <nz-tree [nzData]="nodes" nzShowIcon [nzExpandedIcon]="expandedIcon2">
      <ng-template #expandedIcon2 let-node>
        <i
          *ngIf="!node.origin.isLeaf"
          nz-icon
          [type]="node.isExpanded ? 'folder-open' : 'folder'"
          class="ant-tree-switcher-line-icon"
        ></i>
        <i *ngIf="node.origin.isLeaf" nz-icon type="file" class="ant-tree-switcher-line-icon"></i>
      </ng-template>
    </nz-tree>
  `
})
export class NzDemoTreeCustomizedIconComponent implements OnInit {
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'anticon anticon-smile-o',
      children: [
        { title: 'leaf', key: '1001', icon: 'anticon anticon-meh-o', isLeaf: true },
        { title: 'leaf', key: '1002', icon: 'anticon anticon-frown-o', isLeaf: true }
      ]
    }
  ];

  ngOnInit(): void {}
}
