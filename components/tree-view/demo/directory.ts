import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzTreeFlattener,
  NzTreeViewComponent,
  NzTreeViewFlatDataSource,
  NzTreeViewModule
} from 'ng-zorro-antd/tree-view';

interface FoodNode {
  name: string;
  disabled?: boolean;
  children?: FoodNode[];
}

interface FlatFoodNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana', disabled: true }, { name: 'Fruit loops' }]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
      }
    ]
  }
];

@Component({
  selector: 'nz-demo-tree-view-directory',
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor" [nzDirectoryTree]="true">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle></nz-tree-node-toggle>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          <nz-icon nzType="file" nzTheme="outline" />
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
          <nz-icon [nzType]="tree.isExpanded(node) ? 'folder-open' : 'folder'" nzTheme="outline" />
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewDirectoryComponent implements OnInit, AfterViewInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatFoodNode>;

  readonly levelAccessor = (dataNode: FlatFoodNode): number => dataNode.level;

  readonly hasChild = (_: number, node: FlatFoodNode): boolean => node.expandable;

  private transformer = (node: FoodNode, level: number): FlatFoodNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });

  private treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  selectListSelection = new SelectionModel<FlatFoodNode>(true);

  dataSource!: NzTreeViewFlatDataSource<FoodNode, FlatFoodNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener, TREE_DATA);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tree.expand(this.getNode('Vegetables')!);
    }, 300);
  }

  getNode(name: string): FlatFoodNode | null {
    return this.tree.dataNodes.find(n => n.name === name) || null;
  }
}
