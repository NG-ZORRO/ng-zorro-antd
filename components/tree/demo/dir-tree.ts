import { Component, HostListener, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-dir-tree',
  template: `
    <nz-tree [(ngModel)]="nodes"
             [nzShowExpand]="true"
             [nzDraggable]="true"
             (nzOnDragStart)="dragStart($event)"
             (nzClick)="activeNode($event)">
      <ng-template #nzTreeTemplate let-node>
        <span class="custom-node" draggable="true" aria-grabbed="true" [class.active]="activedNode?.key===node.key">
          <span *ngIf="!node.isLeaf" [class.shine-animate]="node.origin.isLoading">
            <i class="anticon anticon-folder" *ngIf="!node.isExpanded" (click)="openFolder(node)"></i>
            <i class="anticon anticon-folder-open" *ngIf="node.isExpanded" (click)="openFolder(node)"></i>
            <span class="folder-name">{{node.title}}</span>
            <span class="folder-desc">{{node?.origin?.author | lowercase}} created at 2018-04-01</span>
          </span>
          <span *ngIf="node.isLeaf">
            <i class="anticon anticon-file"></i>
            <span class="file-name">{{node.title}}</span>
            <span class="file-desc">{{node?.origin?.author | lowercase}} modified at 2018-05-01</span>
          </span>
        </span>
      </ng-template>
    </nz-tree>`,
  styles  : [ `
    :host ::ng-deep .ant-tree {
      overflow: hidden;
      margin: 0 -24px;
      padding: 0 24px;
    }

    :host ::ng-deep .ant-tree li {
      padding: 4px 0 0 0;
    }

    @keyframes shine {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .shine-animate {
      animation: shine 2s ease infinite;
    }

    .custom-node {
      cursor: pointer;
      line-height: 30px;
      margin-left: 4px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }

    .active {
      background: #87CEFF;
      color: #fff;
    }

    .is-dragging {
      background-color: transparent !important;
      color: #000;
      opacity: 0.7;
    }

    .file-name, .folder-name, .file-desc, .folder-desc {
      margin-left: 4px;
    }

    .file-desc, .folder-desc {
      padding: 2px 8px;
      background: rgba(0,0,0,.15);
      color: #FFFFFF;
    }
  ` ]
})
export class NzDemoTreeDirTreeComponent implements OnInit {
  // can active only one node
  activedNode: NzTreeNode;
  dragNodeElement;
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      author  : 'ANGULAR',
      expanded: true,
      children: [
        {
          title   : 'child1',
          key     : '10001',
          author  : 'ZORRO',
          children: [
            {
              title   : 'child1.1',
              key     : '100011',
              author  : 'ZORRO',
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              author  : 'ZORRO',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  author  : 'ZORRO-FANS',
                  isLeaf  : true,
                  checked : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  author: 'ZORRO-FANS',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      author  : 'ANGULAR',
      children: [
        {
          title : 'child2.1',
          key   : '10021',
          author: 'ZORRO-FANS',
          isLeaf: true
        },
        {
          title   : 'child2.2',
          key     : '10022',
          author  : 'ZORRO',
          children: [
            {
              title : 'grandchild2.2.1',
              key   : '100221',
              author: 'ZORRO-FANS',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];

  @HostListener('mouseleave', [ '$event' ])
  mouseLeave(event: MouseEvent): void {
    event.preventDefault();
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  @HostListener('mousedown', [ '$event' ])
  mouseDown(): void {
    // do not prevent
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  /**
   * important:
   * if u want to custom event/node properties, u need to maintain the selectedNodesList/checkedNodesList yourself
   * @param {} data
   */

  openFolder(data: NzTreeNode): void {
    // do something if u want
    // change node's expand status
    if (!data.isExpanded) {
      // close to open
      data.origin.isLoading = true;
      setTimeout(() => {
        data.isExpanded = !data.isExpanded;
        data.origin.isLoading = false;
      }, 500);
    } else {
      data.isExpanded = !data.isExpanded;
    }
  }

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.activedNode = null;
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
  }

  dragStart(event: NzFormatEmitEvent): void {
    // disallow drag if root or search
    this.activedNode = null;
    this.dragNodeElement = event.event.srcElement;
    if (this.dragNodeElement.className.indexOf('is-dragging') === -1) {
      this.dragNodeElement.className = event.event.srcElement.className + ' is-dragging';
    }
  }

  ngOnInit(): void {

  }
}
