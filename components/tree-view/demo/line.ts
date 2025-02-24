import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule } from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        children: [{ name: 'leaf' }, { name: 'leaf' }]
      },
      {
        name: 'parent 1-1',
        children: [
          { name: 'leaf' },
          {
            name: 'parent 1-1-0',
            children: [{ name: 'leaf' }, { name: 'leaf' }]
          },
          { name: 'leaf' }
        ]
      }
    ]
  },
  {
    name: 'parent 2',
    children: [{ name: 'leaf' }, { name: 'leaf' }]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'nz-demo-tree-view-line',
  imports: [FormsModule, NzIconModule, NzSwitchModule, NzTreeViewModule],
  template: `
    Show Leaf Icon:
    <nz-switch [(ngModel)]="showLeafIcon"></nz-switch>

    <nz-tree-view [nzTreeControl]="treeControl" [nzDataSource]="dataSource">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine>
        @if (showLeafIcon) {
          <nz-tree-node-toggle nzTreeNodeNoopToggle>
            <nz-icon nzType="file" nzTheme="outline" />
          </nz-tree-node-toggle>
        }
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine>
        <nz-tree-node-toggle>
          <nz-icon [nzType]="treeControl.isExpanded(node) ? 'minus-square' : 'plus-square'" nzTheme="outline" />
        </nz-tree-node-toggle>
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewLineComponent implements AfterViewInit {
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level
  });

  treeControl = new FlatTreeControl<FlatNode>(
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

  showLeafIcon = false;

  constructor() {
    this.dataSource.setData(TREE_DATA);
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }
}
