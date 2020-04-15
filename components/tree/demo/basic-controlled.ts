import { Component } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-basic-controlled',
  template: `
    <nz-tree
      [nzData]="nodes"
      nzCheckable
      nzMultiple
      [nzCheckedKeys]="defaultCheckedKeys"
      [nzExpandedKeys]="defaultExpandedKeys"
      [nzSelectedKeys]="defaultSelectedKeys"
      (nzClick)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      (nzCheckBoxChange)="nzEvent($event)"
    >
    </nz-tree>
  `
})
export class NzDemoTreeBasicControlledComponent {
  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
