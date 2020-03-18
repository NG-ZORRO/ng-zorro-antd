import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-transfer-tree-transfer',
  template: `
    <nz-transfer [nzDataSource]="list" [nzShowSelectAll]="false" [nzRenderList]="[leftRenderList, null]" (nzChange)="change($event)">
      <ng-template #leftRenderList let-items let-onItemSelectAll="onItemSelectAll" let-onItemSelect="onItemSelect">
        <nz-tree #tree [nzData]="treeData" nzExpandAll nzBlockNode>
          <ng-template #nzTreeTemplate let-node>
            <span
              class="ant-tree-checkbox"
              [class.ant-tree-checkbox-disabled]="node.isDisabled"
              [class.ant-tree-checkbox-checked]="node.isChecked"
              (click)="checkBoxChange(node, onItemSelect)"
            >
              <span class="ant-tree-checkbox-inner"></span>
            </span>
            <span (click)="checkBoxChange(node, onItemSelect)" class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open">{{
              node.title
            }}</span>
          </ng-template>
        </nz-tree>
      </ng-template>
    </nz-transfer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDemoTransferTreeTransferComponent {
  @ViewChild('tree', { static: true }) tree: NzTreeComponent;
  list: TransferItem[] = [
    { id: 1, parentid: 0, title: 'parent 1' },
    { id: 2, parentid: 1, title: 'leaf 1-1', disabled: true, isLeaf: true },
    { id: 3, parentid: 1, title: 'leaf 1-2', isLeaf: true }
  ];
  treeData = this.generateTree(this.list);
  checkedNodeList: NzTreeNode[] = [];

  private generateTree(arr: TransferItem[]): TransferItem[] {
    const tree: TransferItem[] = [];
    // tslint:disable-next-line:no-any
    const mappedArr: any = {};
    let arrElem: TransferItem;
    let mappedElem: TransferItem;

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

  checkBoxChange(node: NzTreeNode, onItemSelect: (item: TransferItem) => void): void {
    if (node.isDisabled) {
      return;
    }
    node.isChecked = !node.isChecked;
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
