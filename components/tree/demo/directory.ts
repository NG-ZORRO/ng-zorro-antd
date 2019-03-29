import { Component, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-directory',
  template: `
    <nz-tree [nzData]="nodes" (nzClick)="activeNode($event)" (nzDblClick)="openFolder($event)">
      <ng-template #contextTemplate>
        <ul nz-menu nzInDropDown>
          <li nz-menu-item (click)="selectDropdown()">Action 1</li>
          <li nz-menu-item (click)="selectDropdown()">Action 2</li>
        </ul>
      </ng-template>
      <ng-template #nzTreeTemplate let-node>
        <span class="custom-node" [class.active]="activedNode?.key === node.key">
          <span *ngIf="!node.isLeaf" (contextmenu)="contextMenu($event, contextTemplate)">
            <i nz-icon [type]="node.isExpanded ? 'folder-open' : 'folder'" (click)="openFolder(node)"></i>
            <span class="folder-name">{{ node.title }}</span>
            <span class="folder-desc">created by {{ node?.origin?.author | lowercase }}</span>
          </span>
          <span *ngIf="node.isLeaf" (contextmenu)="contextMenu($event, contextTemplate)">
            <i nz-icon type="file"></i>
            <span class="file-name">{{ node.title }}</span>
            <span class="file-desc">modified by {{ node?.origin?.author | lowercase }}</span>
          </span>
        </span>
      </ng-template>
    </nz-tree>
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
        margin-left: 4px;
        display: inline-block;
        margin: 0 -1000px;
        padding: 0 1000px;
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
  dropdown: NzDropdownContextComponent;
  // actived node
  activedNode: NzTreeNode;
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
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(): void {
    this.dropdown.close();
    // do something
  }

  constructor(private nzDropdownService: NzDropdownService) {}
}
