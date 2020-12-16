import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

function dig(path: string = '0', level: number = 3): FoodNode[] {
  const list: FoodNode[] = [];
  for (let i = 0; i < 10; i += 1) {
    const name = `${path}-${i}`;
    const treeNode: FoodNode = {
      name
    };

    if (level > 0) {
      treeNode.children = dig(name, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const TREE_DATA: FoodNode[] = dig();

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'nz-demo-tree-view-virtual-scroll',
  template: `
    <nz-tree-virtual-scroll-view class="virtual-scroll-tree" [nzTreeControl]="treeControl" [nzDataSource]="dataSource">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding>
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding>
        <nz-tree-node-toggle>
          <i nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon></i>
        </nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>
    </nz-tree-virtual-scroll-view>
  `,
  styles: [
    `
      .virtual-scroll-tree {
        height: 200px;
      }
    `
  ]
})
export class NzDemoTreeViewVirtualScrollComponent implements AfterViewInit {
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(TREE_DATA);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngAfterViewInit(): void {}

  getNode(name: string): ExampleFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
