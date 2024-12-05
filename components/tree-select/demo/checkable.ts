import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-checkable',
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [(ngModel)]="value"
      [nzNodes]="nodes"
      (ngModelChange)="onChange($event)"
      nzShowSearch
      nzCheckable
      nzPlaceHolder="Please select"
    ></nz-tree-select>
  `
})
export class NzDemoTreeSelectCheckableComponent {
  value: string[] = ['0-0-0'];
  readonly nodes = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
          isLeaf: true
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
          isLeaf: true
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
          isLeaf: true
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
          isLeaf: true
        }
      ]
    }
  ];

  onChange($event: string[]): void {
    console.log($event);
  }
}
