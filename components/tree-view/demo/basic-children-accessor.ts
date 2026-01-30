import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeViewComponent, NzTreeViewModule, NzTreeViewNestedDataSource } from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  disabled?: boolean;
  children?: TreeNode[];
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
  selector: 'nz-demo-tree-view-basic-children-accessor',
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzChildrenAccessor]="childrenAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle />
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
export class NzDemoTreeViewBasicChildrenAccessorComponent implements OnInit, AfterViewInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<TreeNode>;

  readonly childrenAccessor = (dataNode: TreeNode): TreeNode[] => dataNode.children ?? [];

  readonly hasChild = (_: number, node: TreeNode): boolean => !!node.children?.length;

  selectListSelection = new SelectionModel<TreeNode>(true);

  dataSource!: NzTreeViewNestedDataSource<TreeNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, TREE_DATA);
  }

  ngAfterViewInit(): void {
    this.tree.expandAll();
  }
}
