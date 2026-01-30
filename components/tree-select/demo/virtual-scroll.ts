import { Component } from '@angular/core';

import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

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
  selector: 'nz-demo-tree-select-virtual-scroll',
  imports: [NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      nzShowSearch
      nzPlaceHolder="Please select"
      nzVirtualHeight="300px"
      nzHideUnMatched="true"
    />
  `
})
export class NzDemoTreeSelectVirtualScrollComponent {
  nodes: NzTreeNodeOptions[] = dig();
}
