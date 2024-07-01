import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { TransferChange } from 'ng-zorro-antd/transfer';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-transfer-tree-transfer',
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzShowSelectAll]="false"
      [nzRenderList]="[leftRenderList, null]"
      (nzChange)="change($event)"
    >
      <ng-template #leftRenderList let-items let-onItemSelectAll="onItemSelectAll" let-onItemSelect="onItemSelect">
        <nz-tree
          #tree
          [nzData]="treeData"
          nzExpandAll
          nzBlockNode
          nzCheckable
          nzCheckStrictly
          (nzCheckBoxChange)="treeCheckBoxChange($event, onItemSelect)"
        >
          <ng-template #nzTreeTemplate let-node>
            <span
              (click)="checkBoxChange(node, onItemSelect)"
              class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open"
            >
              {{ node.title }}
            </span>
          </ng-template>
        </nz-tree>
      </ng-template>
    </nz-transfer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDemoTransferTreeTransferComponent {
  @ViewChild('tree', { static: true }) tree!: NzTreeComponent;
  list: NzTreeNodeOptions[] = [
    { key: '0', id: 0, title: '0-0', isLeaf: true },
    { key: '1', id: 1, parentid: 0, title: '0-1' },
    { key: '2', id: 2, parentid: 1, title: '0-1-0', isLeaf: true },
    { key: '3', id: 3, parentid: 1, title: '0-1-1', isLeaf: true },
    { key: '4', id: 4, title: '0-3', isLeaf: true }
  ];
  treeData = this.generateTree(this.list);
  checkedNodeList: NzTreeNode[] = [];

  private generateTree(arr: NzTreeNodeOptions[]): NzTreeNodeOptions[] {
    const tree: NzTreeNodeOptions[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedArr: any = {};
    let arrElem: NzTreeNodeOptions;
    let mappedElem: NzTreeNodeOptions;

    for (let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = { ...arrElem };
      mappedArr[arrElem.id].children = [];
    }

    for (const id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentid) {
          mappedArr[mappedElem.parentid].children.push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  treeCheckBoxChange(event: NzFormatEmitEvent, onItemSelect: (item: NzTreeNodeOptions) => void): void {
    this.checkBoxChange(event.node!, onItemSelect);
  }

  checkBoxChange(node: NzTreeNode, onItemSelect: (item: NzTreeNodeOptions) => void): void {
    if (node.isDisabled) {
      return;
    }

    if (node.isChecked) {
      this.checkedNodeList.push(node);
    } else {
      const idx = this.checkedNodeList.indexOf(node);
      if (idx !== -1) {
        this.checkedNodeList.splice(idx, 1);
      }
    }
    const item = this.list.find(w => w.id === node.origin.id);
    onItemSelect(item!);
  }

  change(ret: TransferChange): void {
    const isDisabled = ret.to === 'right';
    this.checkedNodeList.forEach(node => {
      node.isDisabled = isDisabled;
      node.isChecked = isDisabled;
    });
  }
}
