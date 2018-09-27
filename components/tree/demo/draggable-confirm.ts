import { Component, OnInit } from '@angular/core';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-tree-draggable-confirm',
  template: `
    <nz-tree
      [nzData]="nodes"
      nzDraggable="true"
      (nzExpandChange)="nzAction($event)"
      [nzBeforeDrop]="beforeDrop"
      (nzOnDragStart)="nzAction($event)"
      (nzOnDragEnter)="nzAction($event)"
      (nzOnDragLeave)="nzAction($event)"
      (nzOnDrop)="nzAction($event)"
      (nzOnDragEnd)="nzAction($event)">
    </nz-tree>
  `
})

export class NzDemoTreeDraggableConfirmComponent implements OnInit {
  nodes = [ {
    title   : '0-0',
    key     : '100',
    expanded: true,
    children: [ {
      title   : '0-0-0',
      key     : '1001',
      children: [
        { title: '0-0-0-0', key: '10010', isLeaf: true },
        { title: '0-0-0-1', key: '10011', isLeaf: true }
      ]
    }, {
      title   : '0-0-1',
      key     : '1002',
      children: [
        { title: '0-0-1-0', key: '10020', isLeaf: true }
      ]
    } ]
  } ];

  nzAction(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s
    if (arg.pos === 0) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false);
    }
  }

  ngOnInit(): void {
  }
}
