import { Component } from '@angular/core';

import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

function dig(path = '0', level = 3): NzTreeNodeOptions[] {
  const list: NzTreeNodeOptions[] = [];
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
}

@Component({
  selector: 'nz-demo-tree-virtual-scroll',
  imports: [NzTreeModule],
  template: `<nz-tree [nzData]="nodes" nzBlockNode nzVirtualHeight="300px"></nz-tree>`
})
export class NzDemoTreeVirtualScrollComponent {
  nodes: NzTreeNodeOptions[] = dig();
}
