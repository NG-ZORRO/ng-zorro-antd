import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree
      [nzData]="nodes"
      nzShowIcon="true"
      [nzExpandedIcon]="'down'">
    </nz-tree>
    <nz-tree
      [nzData]="nodes"
      nzShowIcon="true"
      [nzExpandedIcon]='expandedIcon'>
    </nz-tree>
    <ng-template #expandedIcon >
      <i nz-icon type="arrow-down" class="ant-tree-switcher-icon"></i>
    </ng-template>
  `
})

export class NzDemoTreeCustomizedIconComponent implements OnInit {
  nodes = [
    {
      title   : 'parent 1',
      key     : '100',
      expanded: true,
      icon    : 'anticon anticon-smile-o',
      children: [
        { title: 'leaf', key: '1001', icon: 'anticon anticon-meh-o', isLeaf: true },
        { title: 'leaf', key: '1002', icon: 'anticon anticon-frown-o', isLeaf: true }
      ]
    }
  ];

  ngOnInit(): void {
  }
}
