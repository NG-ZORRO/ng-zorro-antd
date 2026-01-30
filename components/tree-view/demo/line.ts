import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeViewComponent, NzTreeViewModule, NzTreeViewNestedDataSource } from 'ng-zorro-antd/tree-view';

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

@Component({
  selector: 'nz-demo-tree-view-line',
  imports: [FormsModule, NzIconModule, NzSwitchModule, NzTreeViewModule],
  template: `
    Show Leaf Icon:
    <nz-switch [(ngModel)]="showLeafIcon" />

    <nz-tree-view [nzDataSource]="dataSource" [nzChildrenAccessor]="childrenAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodeIndentLine [nzExpandable]="false">
        @if (showLeafIcon) {
          <nz-tree-node-toggle nzTreeNodeNoopToggle>
            <nz-icon nzType="file" nzTheme="outline" />
          </nz-tree-node-toggle>
        }
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodeIndentLine [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon [nzType]="tree.isExpanded(node) ? 'minus-square' : 'plus-square'" nzTheme="outline" />
        </nz-tree-node-toggle>
        <nz-tree-node-option>
          {{ node.name }}
        </nz-tree-node-option>
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewLineComponent implements AfterViewInit, OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<TreeNode>;

  readonly childrenAccessor = (dataNode: TreeNode): TreeNode[] => dataNode.children ?? [];

  readonly hasChild = (_: number, node: TreeNode): boolean => !!node.children?.length;

  showLeafIcon = false;

  dataSource!: NzTreeViewNestedDataSource<TreeNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewNestedDataSource<TreeNode>(this.tree, TREE_DATA);
  }

  ngAfterViewInit(): void {
    this.tree.expandAll();
  }
}
