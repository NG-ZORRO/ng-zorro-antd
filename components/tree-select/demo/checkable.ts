import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-select-checkable',
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      nzShowSearch
      nzCheckable
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)">
    </nz-tree-select>`
})

export class NzDemoTreeSelectCheckableComponent implements OnInit {

  value: string[] = [ '0-0-0' ];
  nodes = [ {
    title   : 'Node1',
    value   : '0-0',
    key     : '0-0',
    children: [ {
      title : 'Child Node1',
      value : '0-0-0',
      key   : '0-0-0',
      isLeaf: true
    } ]
  }, {
    title   : 'Node2',
    value   : '0-1',
    key     : '0-1',
    children: [ {
      title : 'Child Node3',
      value : '0-1-0',
      key   : '0-1-0',
      isLeaf: true
    }, {
      title : 'Child Node4',
      value : '0-1-1',
      key   : '0-1-1',
      isLeaf: true
    }, {
      title : 'Child Node5',
      value : '0-1-2',
      key   : '0-1-2',
      isLeaf: true
    } ]
  } ];

  onChange($event: string[]): void {
    console.log($event);
  }

  ngOnInit(): void {
  }
}
