import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzTreeFlattener,
  NzTreeViewComponent,
  NzTreeViewFlatDataSource,
  NzTreeViewModule
} from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  disabled?: boolean;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        disabled: true,
        children: [{ name: 'leaf' }, { name: 'leaf' }]
      },
      {
        name: 'parent 1-1',
        children: [{ name: 'leaf' }]
      }
    ]
  }
];

@Component({
  imports: [NzIconModule, NzTreeViewModule],
  selector: 'nz-demo-tree-view-basic-level-accessor',
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewBasicLevelAccessorComponent implements OnInit, AfterViewInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;

  readonly levelAccessor = (dataNode: FlatNode): number => dataNode.level;

  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });

  private treeFlattener = new NzTreeFlattener<TreeNode, FlatNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  selectListSelection = new SelectionModel<FlatNode>(true);

  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }

  ngAfterViewInit(): void {
    this.tree.expandAll();
  }
}
