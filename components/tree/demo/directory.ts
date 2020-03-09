import { Component, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'nz-demo-tree-directory',
  template: `
    <nz-tree #nzTreeComponent nzBlockNode [nzData]="nodes" [nzTreeTemplate]="nzTreeTemplate"></nz-tree>
    <ng-template #nzTreeTemplate let-node>
      <span
        class="custom-node ant-tree-node-content-wrapper"
        [class.ant-tree-node-selected]="activatedNode?.key === node.key"
        (click)="activeNode(node)"
        (dblclick)="openFolder(node)"
      >
        <span *ngIf="!node.isLeaf" (contextmenu)="contextMenu($event, menu)">
          <i nz-icon [nzType]="node.isExpanded ? 'folder-open' : 'folder'" (click)="openFolder(node)"></i>
          <span class="folder-name">{{ node.title }}</span>
          <span class="folder-desc">created by {{ node?.origin?.author | lowercase }}</span>
        </span>
        <span *ngIf="node.isLeaf" (contextmenu)="contextMenu($event, menu)">
          <i nz-icon nzType="file"></i>
          <span class="file-name">{{ node.title }}</span>
          <span class="file-desc">modified by {{ node?.origin?.author | lowercase }}</span>
        </span>
      </span>
    </ng-template>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="selectDropdown()">Action 1</li>
        <li nz-menu-item (click)="selectDropdown()">Action 2</li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      :host ::ng-deep .ant-tree {
        overflow: hidden;
        margin: 0 -24px;
        padding: 0 24px;
      }

      :host ::ng-deep .ant-tree li {
        padding: 4px 0 0 0;
      }

      .custom-node {
        cursor: pointer;
        line-height: 24px;
        display: inline-block;
      }

      .active {
        background: #1890ff;
        color: #fff;
      }

      .file-name,
      .folder-name {
        margin-left: 4px;
      }

      .file-desc,
      .folder-desc {
        padding: 0 8px;
        display: inline-block;
        background: #87ceff;
        color: #ffffff;
        position: relative;
        left: 12px;
      }
    `
  ]
})
export class NzDemoTreeDirectoryComponent {
  // Break Change
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  // activated node
  activatedNode: NzTreeNode | null;
  nodes = [
    {
      title: 'parent 0',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
    this.nzTreeComponent.renderFlattenNodes();
  }

  activeNode(data: NzTreeNode): void {
    data.isSelected = !data.isSelected;
    if (data.isSelected) {
      this.activatedNode = data;
    } else {
      this.activatedNode = null;
    }
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  constructor(private nzContextMenuService: NzContextMenuService) {}
}
