import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-search',
  template: `
    <nz-input-group [nzSuffix]="suffixIcon">
      <input type="text" nz-input placeholder="Search" [(ngModel)]="searchValue">
    </nz-input-group>
    <ng-template #suffixIcon>
      <i class="anticon anticon-search"></i>
    </ng-template>
    <nz-tree
      #treeCom
      [nzData]="nodes"
      [nzSearchValue]="searchValue"
      (nzClick)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      (nzSearchValueChange)="nzEvent($event)">
    </nz-tree>
  `,
  styles  : [ `
    nz-input-group {
      padding: 10px 0;
    }
  ` ]
})

export class NzDemoTreeSearchComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  searchValue;

  nodes = [ {
    title   : '0-0',
    key     : '0-0',
    children: [ {
      title   : '0-0-0',
      key     : '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
        { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
        { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
      ]
    }, {
      title   : '0-0-1',
      key     : '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
        { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
        { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
      ]
    }, {
      title : '0-0-2',
      key   : '0-0-2',
      isLeaf: true
    } ]
  }, {
    title   : '0-1',
    key     : '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
      { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
      { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
    ]
  }, {
    title : '0-2',
    key   : '0-2',
    isLeaf: true
  } ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event, this.treeCom.getMatchedNodeList().map(v => v.title));
  }

  ngOnInit(): void {
  }
}
