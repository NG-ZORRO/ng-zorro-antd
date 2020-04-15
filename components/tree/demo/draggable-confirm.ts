import { Component } from '@angular/core';
import { NzFormatBeforeDropEvent } from 'ng-zorro-antd/tree';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-tree-draggable-confirm',
  template: ` <nz-tree [nzData]="nodes" nzDraggable nzBlockNode [nzBeforeDrop]="beforeDrop"> </nz-tree> `
})
export class NzDemoTreeDraggableConfirmComponent {
  nodes = [
    {
      title: '0-0',
      key: '100',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '1001',
          children: [
            { title: '0-0-0-0', key: '10010', isLeaf: true },
            { title: '0-0-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '1002',
          children: [{ title: '0-0-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s
    if (arg.pos === 0) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false);
    }
  }
}
