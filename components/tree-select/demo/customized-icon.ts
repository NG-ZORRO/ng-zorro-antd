import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-customized-icon',
  template: `
    <nz-tree-select style="width: 250px" [nzNodes]="nodes" [(ngModel)]="value" nzPlaceHolder="Please select" nzShowIcon>
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
      icon: 'anticon anticon-smile-o',
      children: [
        { title: 'leaf 1-0-0', key: '10010', icon: 'anticon anticon-meh-o', isLeaf: true },
        { title: 'leaf 1-0-1', key: '10011', icon: 'anticon anticon-frown-o', isLeaf: true }
      ]
    }
  ];
}
