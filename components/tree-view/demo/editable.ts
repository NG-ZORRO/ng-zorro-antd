import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  getParentForNestedData,
  NzTreeViewComponent,
  NzTreeViewModule,
  NzTreeViewNestedDataSource
} from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  key: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    key: '1',
    children: [
      {
        name: 'parent 1-0',
        key: '1-0',
        children: [
          { name: 'leaf', key: '1-0-0' },
          { name: 'leaf', key: '1-0-1' }
        ]
      },
      {
        name: 'parent 1-1',
        key: '1-1',
        children: [{ name: 'leaf', key: '1-1-0' }]
      }
    ]
  },
  {
    key: '2',
    name: 'parent 2',
    children: [{ name: 'leaf', key: '2-0' }]
  }
];

@Component({
  selector: 'nz-demo-tree-view-editable',
  imports: [NzButtonModule, NzInputModule, NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzChildrenAccessor]="childrenAccessor" [nzTrackBy]="trackBy">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine [nzExpandable]="false">
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
        <button nz-button nzType="text" nzSize="small" (click)="delete(node)">
          <nz-icon nzType="minus" nzTheme="outline" />
        </button>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasNoContent" nzTreeNodeIndentLine [nzExpandable]="false">
        <input nz-input placeholder="Input node name" nzSize="small" #inputElement />
        &nbsp;
        <button nz-button nzSize="small" (click)="saveNode(node, inputElement.value)">Add</button>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        {{ node.name }}
        <button nz-button nzType="text" nzSize="small" (click)="addNewNode(node)">
          <nz-icon nzType="plus" nzTheme="outline" />
        </button>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewEditableComponent implements OnInit, AfterViewInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<TreeNode>;

  readonly childrenAccessor = (dataNode: TreeNode): TreeNode[] => dataNode.children ?? [];

  readonly hasChild = (_: number, node: TreeNode): boolean => !!node.children?.length;

  readonly hasNoContent = (_: number, node: TreeNode): boolean => node.name === '';

  readonly trackBy = (_: number, node: TreeNode): string => `${node.key}-${node.name}`;

  selectListSelection = new SelectionModel<TreeNode>(true);

  treeData = TREE_DATA;

  dataSource!: NzTreeViewNestedDataSource<TreeNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, this.treeData);
  }

  ngAfterViewInit(): void {
    this.tree.expandAll();
  }

  delete(node: TreeNode): void {
    const parentNode = getParentForNestedData(this.treeData, node, this.childrenAccessor);
    if (parentNode && parentNode.children) {
      parentNode.children = parentNode.children.filter(e => e !== node);
    }

    this.dataSource.setData(this.treeData);
  }
  addNewNode(node: TreeNode): void {
    node.children = node.children || [];
    node.children.push({
      name: '',
      key: `${node.key}-${node.children.length}`
    });
    this.dataSource.setData(this.treeData);
    this.tree.expand(node);
  }

  saveNode(node: TreeNode, value: string): void {
    if (node) {
      node.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
