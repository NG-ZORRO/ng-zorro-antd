import { Component, OnInit } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-virtual-scroll',
  template: ` <nz-tree [nzData]="nodes" nzBlockNode nzVirtualHeight="300px"></nz-tree> `
})
export class NzDemoTreeVirtualScrollComponent implements OnInit {
  nodes: NzTreeNodeOptions[] = [];
  ngOnInit(): void {
    const dig = (path = '0', level = 3) => {
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
