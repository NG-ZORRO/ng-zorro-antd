import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-customized-search',
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [(ngModel)]="value"
      [nzNodes]="nodes"
      [nzHideUnMatched]="true"
      (ngModelChange)="onChange($event)"
      nzShowSearch
      [nzSearchFunc]="nzSearchFunc"
      nzCheckable
      nzPlaceHolder="Please select"
    ></nz-tree-select>
  `
})
export class NzDemoTreeSelectCustomizedSearchComponent {
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
          isLeaf: true,
          searchedText: 'ss'
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
          isLeaf: true,
          searchedText: 'sss'
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
          isLeaf: true,
          searchedText: 'ssss'
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
          isLeaf: true,
          searchedText: 'sssss'
        }
      ]
    }
  ];

  nzSearchFunc = (inputValue: string, node: NzTreeNodeOptions): boolean => {
    const nodeStr = `${node.title} ${node.searchedText}`;
    node.isMatched = nodeStr.indexOf(inputValue) >= 0;
    return node.isMatched;
  };

  onChange($event: string[]): void {
    console.log($event);
  }
}
