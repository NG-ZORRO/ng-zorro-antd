import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzTreeFlattener,
  NzTreeViewFlatDataSource,
  NzTreeViewModule,
  NzTreeVirtualScrollViewComponent
} from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

function dig(path: string = '0', level: number = 3): TreeNode[] {
  const list: TreeNode[] = [];
  for (let i = 0; i < 10; i += 1) {
    const name = `${path}-${i}`;
    const treeNode: TreeNode = {
      name
    };

    if (level > 0) {
      treeNode.children = dig(name, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const TREE_DATA: TreeNode[] = dig();

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'nz-demo-tree-view-virtual-scroll',
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-virtual-scroll-view
      class="virtual-scroll-tree"
      [nzDataSource]="dataSource"
      [nzLevelAccessor]="levelAccessor"
    >
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle />
        {{ node.name }}
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        {{ node.name }}
      </nz-tree-node>
    </nz-tree-virtual-scroll-view>
  `,
  styles: `
    .virtual-scroll-tree {
      height: 200px;
    }
  `
})
export class NzDemoTreeViewVirtualScrollComponent implements OnInit, AfterViewInit {
  @ViewChild(NzTreeVirtualScrollViewComponent, { static: true }) tree!: NzTreeVirtualScrollViewComponent<FlatNode>;

  readonly levelAccessor = (dataNode: FlatNode): number => dataNode.level;

  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level
  });

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tree.expandAll();
    });
  }
}
