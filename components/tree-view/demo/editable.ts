import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

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

interface FlatNode {
  expandable: boolean;
  name: string;
  key: string;
  level: number;
}

@Component({
  selector: 'nz-demo-tree-view-editable',
  template: `
    <nz-tree-view [nzTreeControl]="treeControl" [nzDataSource]="dataSource" [trackBy]="trackBy">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine>
        <nz-tree-node-option
          [nzDisabled]="node.disabled"
          [nzSelected]="selectListSelection.isSelected(node)"
          (nzClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasNoContent" nzTreeNodeIndentLine>
        <input nz-input placeholder="Input node name" nzSize="small" #inputElement />
        &nbsp;
        <button nz-button nzSize="small" (click)="saveNode(node, inputElement.value)">Add</button>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine>
        <nz-tree-node-toggle>
          <i nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon></i>
        </nz-tree-node-toggle>
        {{ node.name }}
        <button nz-button nzType="text" nzSize="small" (click)="addNewNode(node)">
          <i nz-icon nzType="plus" nzTheme="outline"></i>
        </button>
      </nz-tree-node>
    </nz-tree-view>
  `,
  styles: [``]
})
export class NzDemoTreeViewEditableComponent {
  private transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            key: node.key
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = TREE_DATA;
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

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

  constructor() {
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
  hasNoContent = (_: number, node: FlatNode) => node.name === '';
  trackBy = (_: number, node: FlatNode) => `${node.key}-${node.name}`;

  addNewNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push({
        name: '',
        key: `${parentNode.key}-${parentNode.children.length}`
      });
      this.dataSource.setData(this.treeData);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FlatNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
