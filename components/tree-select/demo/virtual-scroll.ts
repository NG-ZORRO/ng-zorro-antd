import { Component, OnInit } from '@angular/core';

import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-select-virtual-scroll',
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      nzShowSearch
      nzPlaceHolder="Please select"
      nzVirtualHeight="300px"
      nzHideUnMatched="true"
    ></nz-tree-select>
  `
})
export class NzDemoTreeSelectVirtualScrollComponent implements OnInit {
  nodes: NzTreeNodeOptions[] = [];

  ngOnInit(): void {
    const dig = (path = '0', level = 3): NzTreeNodeOptions[] => {
      const list = [];
      for (let i = 0; i < 10; i += 1) {
        const key = `${path}-${i}`;
        const treeNode: NzTreeNodeOptions = {
          title: key,
          key,
          expanded: true,
          children: [],
          isLeaf: false
        };

        if (level > 0) {
          treeNode.children = dig(key, level - 1);
        } else {
          treeNode.isLeaf = true;
        }

        list.push(treeNode);
      }
      return list;
    };

    this.nodes = dig();
  }
}
